import { Router } from "express"
import middlewares from "../middlewares/index.js"
import equipmentController from "../controllers/equipment.controller.js"
import ROLES from "../config/roles.config.js"

const router = Router()

export const paths = {
    create: '/create',
    ranking_global: '/ranking/global',
    edit: (uuid) => `/edit/${uuid}`,
    update: (uuid) => `/update/${uuid}`,
    delete: (uuid) => `/delete/${uuid}`,
    show: (uuid) => `/${uuid}`,
    review_create: (uuid) => `/${uuid}/review/create`,
    review_update: (uuid, reviewId) => `/${uuid}/review/${reviewId}/update`
}

router.get(paths.create, 
    middlewares.auth.hasRole(ROLES.ADMIN), 
    equipmentController.equipmentCreateForm
)
router.post(paths.create, 
    middlewares.auth.hasRole(ROLES.ADMIN),
    middlewares.reqValidators.equipmentValidator,
    middlewares.validationErrorHandler,
    equipmentController.createEquipment
)
router.get(paths.edit(':uuid'), 
    middlewares.auth.hasRole(ROLES.ADMIN),
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.validationErrorHandler,
    equipmentController.equipmentUpdateForm
)

router.post(paths.update(':uuid'), 
    middlewares.auth.hasRole(ROLES.ADMIN),
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.reqValidators.equipmentValidator,
    middlewares.validationErrorHandler,
    equipmentController.updateEquipment
)
router.get(paths.delete(':uuid'), 
    middlewares.auth.hasRole(ROLES.ADMIN),
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.validationErrorHandler,
    equipmentController.deleteEquipment
)

router.get(paths.ranking_global, equipmentController.showGlobalRanking)

router.post(paths.review_create(':uuid'), 
    middlewares.auth.isAuthenticated,
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.reqValidators.reviewValidator,
    middlewares.validationErrorHandler,
    equipmentController.createReview
)

router.get(paths.show(':uuid'), 
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.validationErrorHandler,
    equipmentController.showEquipment
)

router.post(paths.review_update(':uuid', ':reviewId'), 
    middlewares.auth.isAuthenticated,
    middlewares.reqValidators.idValidator.equipmentIdValidator,
    middlewares.reqValidators.idValidator.reviewIdValidator,
    middlewares.reqValidators.reviewValidator,
    middlewares.validationErrorHandler,
    equipmentController.updateReview
)

export default router
