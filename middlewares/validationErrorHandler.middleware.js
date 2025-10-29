import { validationResult } from 'express-validator'

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const validationErrors = errors.mapped()
    Object.entries(validationErrors).forEach(([key, detail]) => {
      req.flash('warning', `${detail.msg}`)
    })

    return res.redirectBack()
  }
  next()
}

export default handleValidationErrors