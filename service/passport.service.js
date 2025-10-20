import passport from 'passport'
import User from '../models/user.model.js'

const initPassport = () => {
    passport.use(User.createStrategy())
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
}

export default initPassport