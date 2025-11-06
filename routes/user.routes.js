import express from 'express'
import middlewares from '../middlewares/index.js'
import userController from '../controllers/user.controller.js'

const router = express.Router()

export const paths = {
    reviews: '/reviews',
    reviews_ranking: '/reviews/ranking'
}

router.get(paths.reviews, 
    middlewares.auth.isAuthenticated, 
    userController.showEquipmentsReviewed
)
router.get(paths.reviews_ranking, 
    middlewares.auth.isAuthenticated, 
    userController.showReviewsRanking
)


export default router
