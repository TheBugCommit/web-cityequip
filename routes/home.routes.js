import express from 'express'
import equipmentController from '../controllers/equipment.controller.js'

const router = express.Router()

export const paths = {
    home: '/',
    filter: (type) => `/filter/${type}`
}

router.get(paths.home, equipmentController.home)
router.get(paths.filter(':type'), equipmentController.showEquipmentsByType)

export default router
