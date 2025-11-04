function resetStars(stars) {
    stars.forEach(s => s.classList.remove('fa-solid', 'filled'))
    stars.forEach(s => s.classList.add('fa-regular'))
}

function highlightStars(stars, value) {
    stars.forEach(s => {
        if (s.dataset.value <= value) {
            s.classList.add('fa-solid', 'filled')
            s.classList.remove('fa-regular')
        }
    })
}

const starRating = () => {
    const containers = document.querySelectorAll('.star-rating:not(.readonly)')
    containers.forEach(cont => {
        const stars = cont.querySelectorAll('.star')
        const ratingInput = cont.querySelector('input[name="rating"]')
        if (!ratingInput) return

        highlightStars(stars, ratingInput.value)

        stars.forEach(star => {
            star.addEventListener('mouseenter', () => {
                resetStars(stars)
                highlightStars(stars, star.dataset.value)
            })
    
            star.addEventListener('mouseleave', () => {
                resetStars(stars)
                highlightStars(stars, ratingInput.value)
            })
    
            star.addEventListener('click', () => {
                ratingInput.value = star.dataset.value
                resetStars(stars)
                highlightStars(stars, star.dataset.value)
            })
        })
    })
}

export default starRating