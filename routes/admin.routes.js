import express from 'express'
import middlewares from '../middlewares/index.js'
import ROLES from '../config/roles.config.js'

const router = express.Router()

router.get('/equipment/new', 
    middlewares.auth.hasRole([ROLES.ADMIN]), 
    (req, res) => { res.json({content: 'Render equipment create form'})}
)
router.post('/equipment', 
    middlewares.auth.hasRole([ROLES.ADMIN]),
    (req, res) => { res.json({content: 'Create Equipment'})}
)
router.get('/equipment/:uuid', 
    middlewares.auth.hasRole([ROLES.ADMIN]),
    (req, res) => { res.json({content: 'Render equipment edit form'})}
)
router.put('/equipment/:uuid', 
    middlewares.auth.hasRole([ROLES.ADMIN]),
    (req, res) => { res.json({content: 'Update Equipment'})}
)
router.delete('/equipment/:uuid', 
    middlewares.auth.hasRole([ROLES.ADMIN]),
    (req, res) => { res.json({content: 'Delete Equipment'})}
)

export default router