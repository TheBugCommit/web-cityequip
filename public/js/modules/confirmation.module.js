const confirmation = () => {
    const confirmationButtons = document.querySelectorAll(".confirmation")

    if(confirmationButtons){
        confirmationButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!confirm('Segur que vol ?')) 
                    e.preventDefault()
            })
        })
    }
} 

export default confirmation