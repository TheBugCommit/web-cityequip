import equipmentCache from "../cache/equipment.cache.js"
import equipmentService from "../service/equipment.service.js"
import reviewService from "../service/review.service.js"

const home = async (req, res, next) => {
    try {
        const allEquipments = await equipmentService.getAll()

        res.render('index', {
            title: 'Equipaments',
            equipments: allEquipments,
        })
    } catch (err) {
        next(err)
    }
}

const showEquipmentsByType = async (req, res, next) => {
    try {
        const type = req.params.type
        const equipments = await equipmentService.getEquipmentsByType(type)

        res.render('index', {
            title: `Equipaments`,
            equipments: equipments,
            currentType: type,
        })
    } catch (err) {
        next(err)
    }
}

const createEquipment = async (req, res) => {
    try {
        await equipmentService.createEquipment(req.body)
        equipmentCache.addType(req.body.tipus)

        req.flash('success', 'Equipment created')
    } catch (err) {
        req.flash('error', err.message)
        if (err.errors && Array.isArray(err.errors))
            err.errors.forEach(error => req.flash('warning', error.message))
    }
    return res.redirectBack()
}

const updateEquipment = async (req, res) => {
    try {
        await equipmentService.updateEquipment(req.params.uuid, req.body)
        equipmentCache.addType(req.body.tipus)

        req.flash('success', 'Equipment updated')
    } catch (err) {
        req.flash('error', err.message)
        if (err.errors && Array.isArray(err.errors))
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
    return res.redirect('/')
}

const equipmentCreateForm = (req, res) => {
    res.render('equipment/create', {
        title: `Crear Equipment`,
        submitText: 'Crear equipament',
    })
}

const equipmentUpdateForm = async (req, res, next) => {
    try {
        const uuid = req.params.uuid

        const equipment = await equipmentService.getEquipmentById(uuid)
        if (!equipment) throw new Error("Equipament no trobat")

        res.render('equipment/edit', {
            title: `Editar: ${equipment.nom}`,
            equipment: equipment,
            submitText: 'Actualitzar equipament',
        })
    } catch (err) {
        next(err)
    }
}

const showEquipment = async (req, res, next) => {
    try {
        const uuid = req.params.uuid
        if (!uuid) throw new Error("UUID de l'equipament no especificat")

        const equipment = await equipmentService.getEquipmentById(uuid)
        if (!equipment) throw new Error("Equipament no trobat")

        res.render('equipment/detail', {
            title: `Detall: ${equipment.nom}`,
            equipment: equipment,
        })
    } catch (err) {
        next(err)
    }
}

const showGlobalRanking = async (req, res, next) => {
    try {
        const topEquipments = await equipmentService.getGlobalBestEquipments(3)

        res.render('globalRanking', {
            title: 'Ranking Global',
            topEquipments: topEquipments,
        })
    } catch (err) {
        next(err)
    }
}

const createReview = async (req, res) => {
    try {
        await reviewService.createReview({
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
        await reviewService.updateReview({
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
    showEquipmentsByType,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    equipmentCreateForm,
    equipmentUpdateForm,
    showEquipment,
    showGlobalRanking,
    createReview,
    updateReview
}

export default equipmentController

