import idValidator from './validators/id.validator.js'
import userValidator from './validators/user.validator.js'
import validationErrorHandler from './validationErrorHandler.middleware.js'
import registerValidator from './validators/register.validator.js'
import errorHandler from './error.middleware.js'

const middlewares = {
    errorHandler: errorHandler,
    validationErrorHandler: validationErrorHandler,
    reqValidators: {
        idValidator: idValidator,
        userValidator: userValidator,
        registerValidator: registerValidator,
    }
}

export default middlewares