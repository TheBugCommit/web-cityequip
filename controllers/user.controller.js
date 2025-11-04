import equipmentService from "../service/equipment.service.js"
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

const showReviewsRanking = async (req, res, next) => {
    try {
        const topEquipments = await equipmentService.getGlobalBestEquipmentsByUser(req.user._id, 3)

        res.render('user/ranking', {
            title: 'Ranking Personal',
            topEquipments: topEquipments,
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
