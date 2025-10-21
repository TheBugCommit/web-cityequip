import express from 'express'

const router = express.Router()

router.post('/:uuid', () => {}) //add or update equipment review  
router.get('/ranking/global', () => {}) //shows global ranking 
router.get('/ranking/personal', () => {}) //shows personal ranking

export default router