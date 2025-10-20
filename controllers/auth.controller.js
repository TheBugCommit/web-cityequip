const loginUser = (req, res, next) => {
    req.flash('success', 'Register succesful')
    res.redirect('/')
}


const authController = {
    loginUser,
}

export default authController