import reviewService from "../service/review.service.js"

const showEquipmentsReviewed = async (req, res, next) => { //TODO: TEST
    try {
        const reviews = await reviewService.getUserReviews(req.user._id)
        console.log(reviews)
        //res.render('path de la vista')  TODO: Vista
        res.json({ message: 'show my reviews' })
    } catch (err) {
        next(err)
    }
}

const showReviewsRanking = async (req, res, next) => { //TODO: TEST
    try {
        const reviews = await reviewService.getPersonalRanking(req.user._id)
        console.log(reviews)
        //res.render('path de la vista')  TODO: Vista
        res.json({ message: 'Show user reviews ranking' })
    } catch (err) {
        next(err)
    }
}

const userController = {
    showEquipmentsReviewed,
    showReviewsRanking,
}

export default userController