import { param } from 'express-validator'

const equipmentIdValidator = [
  param('uuid')
    .isUUID(4).withMessage('UUID param must be a valid UUID'),
]

const reviewIdValidator = [
  param('reviewId')
    .isUUID(4).withMessage('reviewId param must be a valid UUID'),
]

const idValidator = {
  equipmentIdValidator,
  reviewIdValidator
}

export default idValidator