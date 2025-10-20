const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Error interno del servidor'

  res.status(status).render('error', {
    title: `Error ${status}`,
    status,
    message,
    user: req.user,
    menu: res.locals.menu,
  })
}

export default errorHandler