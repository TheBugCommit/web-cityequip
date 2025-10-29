const hasRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash('info', 'You must log in')
      return res.redirect('/auth/login')
    }

    if (!allowedRoles.includes(req.user.role)) {
      req.flash('warning', 'You do not have permissions for this section')
      return res.redirectBack()
    }

    next()
  }
}

export default hasRole