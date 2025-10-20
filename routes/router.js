import { Router } from "express"
import userController from '../controllers/user.controller.js'
import middlewares from "../middlewares/index.js"
import authController from "../controllers/auth.controller.js"

const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', userController.registerForm)
router.post('/register',  
    middlewares.reqValidators.registerValidator,
    middlewares.validationErrorHandler,
    userController.registerUser,
    authController.login
)
router.get('/login', authController.loginForm)
router.post('/login', 
    middlewares.reqValidators.loginValidator, 
    middlewares.validationErrorHandler,
    authController.login
)
router.get('/logout', authController.logout)

export default router