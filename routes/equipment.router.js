import { Router } from "express"

const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})
router.get('/type/:type', (req, res) => {
    res.send({content: 'Filter equipment by type'})
})
router.get('/:uuid', (req, res) => {
    res.send({content: 'Detailed equipment uuid'})
})   

export default router