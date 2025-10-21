import express from 'express'
import middlewares from '../middlewares/index.js'
import userController from '../controllers/user.controller.js'

const router = express.Router()

router.get('/reviews', 
    middlewares.auth.isAuthenticated, 
    userController.showEquipmentsReviewed
)
router.get('/reviews/ranking', 
    middlewares.auth.isAuthenticated, 
    userController.showReviewsRanking
)


export default router
