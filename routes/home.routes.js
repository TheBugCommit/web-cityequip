import express from 'express'
import equipmentController from '../controllers/equipment.controller.js'

const router = express.Router()

router.get('/', equipmentController.home)
router.get('/filter/:type', equipmentController.showEquipmentsByType)

export default router
