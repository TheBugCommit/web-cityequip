import passportLocalMongoose from 'passport-local-mongoose'
import mongoose from 'mongoose'
import ROLES from '../config/roles.config.js'

mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'Please provide an email address'
    },
    name: {
        type: String,
        required: 'Please provide a nc = mongoose.mame',
        trim: true
    },
    role: { 
        type: String, 
        enum: [ROLES.USER, ROLES.ADMIN], 
        default: 'user' 
    }
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

const User = mongoose.model('User', userSchema)
export default User