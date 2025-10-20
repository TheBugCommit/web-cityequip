export const flash = (req, res, next) => {
  req.flash = (type, msg) => {
    if (!req.session.messages) req.session.messages = {}
    if (!req.session.messages[type]) req.session.messages[type] = []
    req.session.messages[type].push(msg)
  }
  
  next()
}