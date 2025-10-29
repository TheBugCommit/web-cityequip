import { Router } from "express"
import middlewares from "../middlewares/index.js"
import equipmentController from "../controllers/equipment.controller.js"
import ROLES from "../config/roles.config.js"

const router = Router()

router.get('/type/:type', equipmentController.equipmentsByType)
router.get('/:uuid', equipmentController.showEquipment)   
router.get('/map', equipmentController.showEquipmentsMap)
router.get('/ranking/global', equipmentController.showGlobalRanking)
router.post('/:uuid/review/new', 
    middlewares.auth.isAuthenticated, 
    equipmentController.createReview
)
router.post('/:uuid/review/:reviewId', 
    middlewares.auth.isAuthenticated, 
    equipmentController.updateReview
)

// CRUD
router.get('/new', 
    middlewares.auth.hasRole([ROLES.ADMIN]), 
    equipmentController.equipmentCreateForm
)
router.get('/:uuid', 
    middlewares.auth.hasRole([ROLES.ADMIN]),
    equipmentController.equipmentUpdateForm
)
router.post('/new', 
    middlewares.auth.hasRole([ROLES.ADMIN]),
    equipmentController.createEquipment
)
router.post('/update/:uuid', 
    middlewares.auth.hasRole([ROLES.ADMIN]),
    equipmentController.updateEquipment
)
router.delete('/delete/:uuid', 
    middlewares.auth.hasRole([ROLES.ADMIN]),
    equipmentController.deleteEquipment
)

export default router