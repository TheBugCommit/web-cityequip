const registerForm = (req, res) => {
    res.render('auth/register', { title: 'Register' })
}

const registerUser = async (req, res, next) => {
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
        //await userService.registerUser(req.body.name, req.body.email, req.body.password)
        res.redirect('index')
    } catch (err) {
        next(err)
    }
}

const userController = {
    registerForm,
    registerUser
}

export default userController