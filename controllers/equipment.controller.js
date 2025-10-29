import reviewService from "../service/review.service.js"

const home = (req, res) => { 
    res.render('index')
}

const createEquipment = (req, res) => {
    res.json({ content: 'Create Equipment' })
}

const updateEquipment = (req, res) => {
    res.json({ content: 'Update Equipment' })
}

const deleteEquipment = (req, res) => {
    res.json({ content: 'Delete Equipment' })
}

const equipmentCreateForm = (req, res) => {
    res.json({ content: 'Render equipment create form' })
}

const equipmentUpdateForm = (req, res) => {
    res.json({ content: 'Render equipment update form' })
}

const equipmentsByType = (req, res) => {
    res.json({content: 'Filter equipment by type'})
} 

const showEquipment = (req, res) => {
    res.json({content: 'Render Detailed equipment uuid'})
} 

const showEquipmentsMap = (req, res) => {
    res.json({content: 'Render global map view'})
} 

const showGlobalRanking = (req, res) => {
    res.json({content: 'Global equipments puntuation ranking'})
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

    return res.redirect(req.header('Referer') || '/')
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

    return res.redirect(req.header('Referer') || '/')
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
