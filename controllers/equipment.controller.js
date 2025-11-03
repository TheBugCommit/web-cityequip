import equipmentService from "../service/equipment.service.js"
import reviewService from "../service/review.service.js"

/* TODO: 
    - render views
        - vista de mapa global
        - vista ranking global
        - vista ranking personal
        - vista equipments comentats
        - vista creat equipament
        - vista update equipament
        - vista detall equipament
        - filtre per tipus (pendent de revisio)

        - En la API, normalitzar majuscules i miniscules i tambe en els validadors

*/

const home = async (req, res, next) => {
    try {
        const allEquipments = await equipmentService.getAll()

        res.render('index', {
            title: 'Equipaments',
            equipments: allEquipments,
            unicTypes: req.session.unicTypes || [],
            user: req.user,
        })
    } catch (err) {
        next(err)
    }
}

const showEquipmentsByType = async (req, res, next) => {
    try {
        const type = req.params.type;
        const equipments = await equipmentService.getEquipmentsByType(type);

        res.render('index', {
            title: 'Equipaments',
            equipments: equipments,
            unicTypes: req.session.unicTypes || [],
            currentType: type,
            user: req.user,
        })
    } catch (err) {
        next(err);
    }
}

const createEquipment = async (req, res) => {
    try {
        await equipmentService.createEquipment(req.body)
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
        actionUrl: `/equipment/new`,
        submitText: 'Crear equipament',
        cancelUrl: `/`,
        unicTypes: req.session.unicTypes || [], 
        user: req.user
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
            actionUrl: `/equipment/update/${equipment.uuid}`,
            submitText: 'Actualitzar equipament',
            cancelUrl: `/equipment/${equipment.uuid}`,
            unicTypes: req.session.unicTypes || [], 
            user: req.user
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

        const reviews = await reviewService.getReviewsByEquipment(uuid)

        res.render('equipment/detail', {
            title: `Detall: ${equipment.nom}`,
            equipment: equipment,
            reviews: reviews,
            user: req.user
        })
    } catch (err) {
        next(err)
    }
}

const showEquipmentsMap = (req, res) => { //TODO: render view
    res.json({ content: 'Render global map view' })
}

const showGlobalRanking = async (req, res, next) => { //TODO: render view
    try {
        const items = await reviewService.getGlobalRanking(3)

        res.render('global', {
            title: 'Ranking Global',
            equipments: items,
            user: req.user
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
    showEquipmentsMap,
    showGlobalRanking,
    createReview,
    updateReview
}

export default equipmentController

