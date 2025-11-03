import reviewService from "../service/review.service.js"

const showEquipmentsReviewed = async (req, res, next) => { //TODO: render view
    try {
        const reviews = await reviewService.getUserReviews(req.user._id)
        res.render('reviews', {
            title: 'Les meves reviews',
            equipments: reviews,
            user: req.user
        })
    } catch (err) {
        next(err)
    }
}

const showReviewsRanking = async (req, res, next) => { //TODO: render view
    try {
        const reviews = await reviewService.getPersonalRanking(req.user._id)
        res.render('user', {
            title: 'Ranking Personal',
            equipments: reviews,
            user: req.user
        })
    } catch (err) {
        next(err)
    }
}

const userController = {
    showEquipmentsReviewed,
    showReviewsRanking,
}

export default userController
