import User from "../models/user.model.js";

const registerUser = async (name, email, password) => {
    const user = new User({ name, email })
    await User.register(user, password)
    return user;
}

const userService = {
    registerUser,
}

export default userService