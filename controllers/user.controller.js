import reviewService from "../service/review.service.js"

const showEquipmentsReviewed = (req, res) => {
    //const reviews = reviewService.getUserReviews(req.user._id)
    //res.render('path de la vista')  #TODO: Vista
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