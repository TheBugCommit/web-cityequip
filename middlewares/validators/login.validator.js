import { body } from "express-validator"

const loginValidator = [
    body('email')
        .isEmail()
        .normalizeEmail({
            remove_dots: false,
            remove_extension: false,
            gmail_remove_subaddress: false
        })
        .withMessage('Must be a valid Email'),

    body('password')
        .notEmpty().withMessage('Password cannot be empty'),
]

export default loginValidator