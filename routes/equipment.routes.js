import { Router } from "express"
import middlewares from "../middlewares/index.js"
import equipmentController from "../controllers/equipment.controller.js"
import ROLES from "../config/roles.config.js"

const router = Router()

router.get('/:uuid', 
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.validationErrorHandler,
    equipmentController.showEquipment
)   
router.get('/map', equipmentController.showEquipmentsMap)
router.get('/ranking/global', equipmentController.showGlobalRanking)
router.post('/:uuid/review/new', 
    middlewares.auth.isAuthenticated,
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.reqValidators.reviewValidator,
    middlewares.validationErrorHandler,
    equipmentController.createReview
)
router.post('/:uuid/review/:reviewId', 
    middlewares.auth.isAuthenticated,
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.reqValidators.idValidator.reviewIdValidator,
    middlewares.reqValidators.reviewValidator,
    middlewares.validationErrorHandler,
    equipmentController.updateReview
)

// CRUD
router.get('/new', 
    middlewares.auth.hasRole(ROLES.ADMIN), 
    equipmentController.equipmentCreateForm
)
router.get('/:uuid', 
    middlewares.auth.hasRole(ROLES.ADMIN),
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.validationErrorHandler,
    equipmentController.equipmentUpdateForm
)
router.post('/new', 
    middlewares.auth.hasRole(ROLES.ADMIN),
    middlewares.reqValidators.equipmentValidator,
    middlewares.validationErrorHandler,
    equipmentController.createEquipment
)
router.post('/update/:uuid', 
    middlewares.auth.hasRole(ROLES.ADMIN),
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.reqValidators.equipmentValidator,
    middlewares.validationErrorHandler,
    equipmentController.updateEquipment
)
router.get('/delete/:uuid', 
    middlewares.auth.hasRole(ROLES.ADMIN),
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.validationErrorHandler,
    equipmentController.deleteEquipment
)

export default router