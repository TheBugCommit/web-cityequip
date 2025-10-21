import { Router } from "express";
import middlewares from "../middlewares/index.js";
import authController from "../controllers/auth.controller.js";

const router = Router()

router.get('/register', authController.registerForm)
router.post('/register',  
    middlewares.reqValidators.registerValidator,
    middlewares.validationErrorHandler,
    authController.register,
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
