import User from "../models/user.model.js";
import handleMongooseError from "../utils/handleMongooseError.utils.js";

const registerUser = async (name, email, password) => {
    try {
        const user = new User({ name, email })
        await User.register(user, password)
        return user;
    } catch (err) {
        throw handleMongooseError(err, 'Error registering user')
    }
}

const userService = {
    registerUser,
}

export default userService