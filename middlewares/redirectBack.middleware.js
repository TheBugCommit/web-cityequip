const redirectBack = (req, res, next) => {
  res.redirectBack = (fallback = '/') => {
    res.redirect(req.header('Referer') || fallback)
  }
  next()
}

export default redirectBack