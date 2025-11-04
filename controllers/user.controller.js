import equipmentService from "../service/equipment.service.js"

const showEquipmentsReviewed = async (req, res, next) => {
    try {
        const equipments = await equipmentService.getEquipmentsReviewedByUser(req.user._id)

        res.render('user/reviewedEquipments', {
            title: 'Equipaments Comentats/Puntuats',
            equipments: equipments,
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
