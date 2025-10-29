import { validationResult } from 'express-validator'

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const validationErrors = errors.mapped()
    Object.entries(validationErrors).forEach(([key, detail]) => {
      req.flash('warning', `${detail.msg}`)
    })

    return res.redirect(req.header('Referer') || '/')
  }
  next()
}

export default handleValidationErrors