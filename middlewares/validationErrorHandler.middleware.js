import { validationResult } from 'express-validator'

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) req.validationErrors = errors.mapped()
  next()
}

export default handleValidationErrors