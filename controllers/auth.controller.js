import passport from "passport"

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
            return res.redirect('/login')
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

const authController = {
    login,
    logout,
    loginForm
}

export default authController