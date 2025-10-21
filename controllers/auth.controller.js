import passport from "passport"
import userService from "../service/user.service.js"

const register = async (req, res, next) => {
    try {
        if (req.validationErrors) {
            req.flash('error', 'Hi han camps que no son correctes')
            return res.render('auth/register', {
                title: 'Register',
                body: req.body,
                errors: req.validationErrors,
                messages: req.session.messages
            })
        }
        
        await userService.registerUser(req.body.name, req.body.email, req.body.password)
        
        next()
    } catch (err) {
        next(err)
    }
}

const login = (req, res, next) => {
    if (req.validationErrors) {
        req.flash('warning', 'Some fields are incorrect')
        return res.render('auth/login', {
            title: 'Login',
            body: req.body,
            errors: req.validationErrors,
            messages: req.session.messages
        })
    }

    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err)

        if (!user) {
            req.flash('error', info?.message || 'Failed login')
            return res.redirect('/auth/login')
        }

        req.login(user, (err) => {
            if (err)
                return next(err)

            req.flash('success', 'You are now logged in')
            return res.redirect('/')
        })
    })(req, res, next)
}

const logout = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err)

        req.flash('success', 'You are now logged out')
        res.redirect('/')
    })
}

const loginForm = (req, res, next) => {
    if (req.isAuthenticated()) {
        const error = new Error('You are already logged in')
        error.status = 403
        return next(error)
    }

    res.render('auth/login', { title: 'Login' })
}

const registerForm = (req, res) => {
    res.render('auth/register', { title: 'Register' })
}

const authController = {
    login,
    register,
    logout,
    loginForm,
    registerForm
}

export default authController