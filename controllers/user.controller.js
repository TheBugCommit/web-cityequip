const showEquipmentsReviewed = (req, res) => {
    res.json({ message: 'show my reviews' })
}

const showReviewsRanking = (req, res) => {
    res.json({ message: 'Show user reviews ranking' })
}

const userController = {
    showEquipmentsReviewed,
    showReviewsRanking,
}

export default userController