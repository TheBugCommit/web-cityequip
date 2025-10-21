import { Router } from "express";
import middlewares from "../middlewares/index.js";
import authController from "../controllers/auth.controller.js";

const router = Router()

router.get('/login', authController.loginForm)
router.get('/register', authController.registerForm)
router.get('/logout', authController.logout)
router.post('/register',  
    middlewares.reqValidators.registerValidator,
    middlewares.validationErrorHandler,
    authController.register,
    authController.login
)
router.post('/login', 
    middlewares.reqValidators.loginValidator, 
    middlewares.validationErrorHandler,
    authController.login
)

export default router
