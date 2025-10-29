import { body } from 'express-validator'

const reviewValidator = [
  body('rating')
    .exists().withMessage('Punctuation is required.')
    .isInt({ min: 1, max: 5 }).withMessage('The score must be a whole number between 1 and 5.'),
    
  body('comment')
    .optional({ nullable: true })
    .isString().withMessage('The comment must be text.')
    .trim()
    .isLength({ max: 500 }).withMessage('The comment cannot exceed 500 characters.'),
]

export default reviewValidator