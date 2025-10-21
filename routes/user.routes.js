import express from 'express'
import middlewares from '../middlewares/index.js'

const router = express.Router()

router.get('/reviews', 
    middlewares.auth.isAuthenticated, 
    (req, res) => { res.json({ message: 'show my reviews' }) }
)
router.get('/reviews/ranking', 
    middlewares.auth.isAuthenticated, 
    (req, res) => { res.json({ message: 'Show user reviews ranking' } )}
)


export default router
