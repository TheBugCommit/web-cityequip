import { Router } from "express";
import middlewares from "../middlewares/index.js";
import authController from "../controllers/auth.controller.js";

const router = Router()

export const paths = {
    login: '/login',
    register: '/register',
    logout: '/logout'
};

router.get(paths.login, authController.loginForm)
router.get(paths.register, authController.registerForm)
router.get(paths.logout, authController.logout)
router.post(paths.register,  
    middlewares.reqValidators.registerValidator,
    middlewares.validationErrorHandler,
    authController.register,
    authController.login
)
router.post(paths.login, 
    middlewares.reqValidators.loginValidator, 
    middlewares.validationErrorHandler,
    authController.login
)

export default router
