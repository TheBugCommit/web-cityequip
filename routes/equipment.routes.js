import { Router } from "express"
import middlewares from "../middlewares/index.js"

const router = Router()

router.get('/type/:type', (req, res) => { res.json({content: 'Filter equipment by type'})})
router.get('/:uuid', (req, res) => {res.json({content: 'Detailed equipment uuid'})})   
router.get('/map', (req, res) => { res.json({content: 'Render global map view'})})
router.get('/ranking/global', (req, res) => { res.json({content: 'Global equipments puntuation ranking'})})
router.post('/:uuid/reviews', 
    middlewares.auth.isAuthenticated, 
    (req, res) => { res.json({content: 'Create review'})}
)
router.put('/:uuid/reviews/:reviewId', 
    middlewares.auth.isAuthenticated, 
    (req, res) => { res.json({content: 'Create review'})}
)


export default router