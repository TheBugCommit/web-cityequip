import { body } from "express-validator"

const registerValidator = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),

    body('email')
        .isEmail()
        .normalizeEmail({
            remove_dots: false,
            remove_extension: false,
            gmail_remove_subaddress: false
        })
        .withMessage('Debe ser un email válido'),

    body('password')
        .notEmpty().withMessage('La contraseña debe tener al menos 6 caracteres'),

    body('password-confirm')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Las contraseñas no coinciden'),
]

export default registerValidator