import idValidator from './validators/id.validator.js'
import userValidator from './validators/user.validator.js'
import validationErrorHandler from './validationErrorHandler.middleware.js'
import registerValidator from './validators/register.validator.js'
import errorHandler from './error.middleware.js'
import loginValidator from './validators/login.validator.js'
import isAuthenticated from './auth/auth.middleware.js'
import hasRole from './auth/role.middleware.js'

const middlewares = {
    errorHandler: errorHandler,
    validationErrorHandler: validationErrorHandler,
    auth: {
        isAuthenticated: isAuthenticated,
        hasRole: hasRole
    },
    reqValidators: {
        idValidator: idValidator,
        userValidator: userValidator,
        registerValidator: registerValidator,
        loginValidator: loginValidator,
    }
}

export default middlewares