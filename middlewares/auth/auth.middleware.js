const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) 
    return next()
  
  req.flash('info', 'You must log in to access this page/action')
  res.redirect('/auth/login')
}

export default isAuthenticated