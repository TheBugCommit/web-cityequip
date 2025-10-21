import express from 'express'
import equipmentController from '../controllers/equipment.controller.js'

const router = express.Router()

router.get('/', equipmentController.home)

export default router
