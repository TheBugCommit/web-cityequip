import { param } from 'express-validator'

const mongoIdValidator = [
  param('id')
    .isUUID(4).withMessage('ID must be a valid UUID'),
]

export default mongoIdValidator