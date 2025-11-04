import { Router } from "express"
import middlewares from "../middlewares/index.js"
import equipmentController from "../controllers/equipment.controller.js"
import ROLES from "../config/roles.config.js"

const router = Router()

router.get('/create', 
    middlewares.auth.hasRole(ROLES.ADMIN), 
    equipmentController.equipmentCreateForm
)
router.post('/create', 
    middlewares.auth.hasRole(ROLES.ADMIN),
    middlewares.reqValidators.equipmentValidator,
    middlewares.validationErrorHandler,
    equipmentController.createEquipment
)
router.get('/edit/:uuid', 
    middlewares.auth.hasRole(ROLES.ADMIN),
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.validationErrorHandler,
    equipmentController.equipmentUpdateForm
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

router.get('/map', equipmentController.showEquipmentsMap)

router.get('/ranking/global', equipmentController.showGlobalRanking)

router.post('/review/new/:uuid', 
    middlewares.auth.isAuthenticated,
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.reqValidators.reviewValidator,
    middlewares.validationErrorHandler,
    equipmentController.createReview
)

router.get('/:uuid', 
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.validationErrorHandler,
    equipmentController.showEquipment
)

router.post('/:uuid/review/:reviewId', 
    middlewares.auth.isAuthenticated,
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.reqValidators.idValidator.reviewIdValidator,
    middlewares.reqValidators.reviewValidator,
    middlewares.validationErrorHandler,
    equipmentController.updateReview
)

export default router
