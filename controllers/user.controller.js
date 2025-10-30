import reviewService from "../service/review.service.js"

const showEquipmentsReviewed = async (req, res, next) => { //TODO: render view
    try {
        const reviews = await reviewService.getUserReviews(req.user._id)
        console.log(reviews)
        //res.render('path de la vista')  TODO: Vista
    } catch (err) {
        req.flash('error', err.message)
    }

    res.redirectBack()
}

const showReviewsRanking = async (req, res, next) => { //TODO: render view
    try {
        const reviews = await reviewService.getPersonalRanking(req.user._id)
        console.log(reviews)
        //res.render('path de la vista')  TODO: Vista
    } catch (err) {
        req.flash('error', err.message)
    }

    res.redirectBack()
}

const userController = {
    showEquipmentsReviewed,
    showReviewsRanking,
}

export default userController