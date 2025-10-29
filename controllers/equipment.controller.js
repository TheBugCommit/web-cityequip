import equipmentService from "../service/equipment.service.js"
import reviewService from "../service/review.service.js"

const home = (req, res) => {
    res.render('index')
}

const createEquipment = async (req, res) => {
    try {
        const equipment = await equipmentService.createEquipment(req.body)
        req.flash('success', 'Equipment created')
    } catch (err) {
        req.flash('error', err.message)
        if(err.errors && Array.isArray(err.errors)) 
            err.errors.forEach(error => req.flash('warning', error.message))
    }
    return res.redirectBack()
}

const updateEquipment = async (req, res) => {
    try {
        const equipment = await equipmentService.updateEquipment(req.params.uuid, req.body)
        req.flash('success', 'Equipment updated')
    } catch (err) {
        req.flash('error', err.message)
        if(err.errors && Array.isArray(err.errors)) 
            err.errors.forEach(error => req.flash('warning', error.message))
    }
    return res.redirectBack()
}

const deleteEquipment = async (req, res) => {
    try {
        await equipmentService.deleteEquipment(req.params.uuid)
        req.flash('success', 'Equipment deleted')
    } catch (err) {
        req.flash('error', err.message)
    }
    return res.redirectBack()
}

const equipmentCreateForm = (req, res) => {
    res.json({ content: 'Render equipment create form' })
}

const equipmentUpdateForm = (req, res) => {
    res.json({ content: 'Render equipment update form' })
}

const equipmentsByType = (req, res) => {
    res.json({ content: 'Filter equipment by type' })
}

const showEquipment = (req, res) => {
    res.json({ content: 'Render Detailed equipment uuid' })
}

const showEquipmentsMap = (req, res) => {
    res.json({ content: 'Render global map view' })
}

const showGlobalRanking = (req, res) => {
    res.json({ content: 'Global equipments puntuation ranking' })
}

const createReview = async (req, res) => {
    try {
        const review = await reviewService.createReview({
            userId: req.user._id,
            equipmentUuid: req.params.uuid,
            rating: req.body.rating,
            comment: req.body.comment
        })

        req.flash('success', `Review created`)
    } catch (err) {
        req.flash('error', err.message)
    }

    return res.redirectBack()
}

const updateReview = async (req, res) => {
    try {
        const updatedReview = await reviewService.updateReview({
            reviewId: req.params.reviewId,
            userId: req.user._id,
            equipmentUuid: req.params.uuid,
            rating: req.body.rating,
            comment: req.body.comment
        })
        req.flash('success', `Review updated`)
    } catch (err) {
        req.flash('error', err.message)
    }

    return res.redirectBack()
}

const equipmentController = {
    home,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    equipmentCreateForm,
    equipmentUpdateForm,
    equipmentsByType,
    showEquipment,
    showEquipmentsMap,
    showGlobalRanking,
    createReview,
    updateReview
}

export default equipmentController
