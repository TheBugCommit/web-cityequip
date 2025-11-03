import express from 'express'
import equipmentController from '../controllers/equipment.controller.js'
import ensureUnicTypes from '../middlewares/ensureTypes.middleware.js'

const router = express.Router()

router.get('/', ensureUnicTypes, equipmentController.home)
router.get('/filter/:type', ensureUnicTypes, equipmentController.showEquipmentsByType)

export default router
