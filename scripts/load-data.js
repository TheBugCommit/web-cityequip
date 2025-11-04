import 'dotenv/config'
import fs from 'fs'
import User from '../models/user.model.js'
import Review from '../models/review.model.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { connectDB, disconnectDB } from '../config/db.config.js'
import equipmentService from '../service/equipment.service.js'

async function deleteData() {
    await Review.deleteMany()
    await User.deleteMany()
}

async function loadData(equipments) {
    try {
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)

        const reviews = JSON.parse(fs.readFileSync(__dirname + '/reviews.json', 'utf-8'))
        const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'))

        await Promise.all(
            users.map(async (user) => {
                const userInst = new User({ name: user.name, email: user.email, role: user.role })
                await User.register(userInst, user.password)
            })
        )

        const allUsers = await User.find()
        const reviewsWithUsers = reviews.map((review, index) => ({
            ...review,
            equipmentUuid: equipments[index % equipments.length].uuid,
            user: allUsers[index % allUsers.length]._id
        }))
        await Review.insertMany(reviewsWithUsers)

    } catch (e) {
        console.log(e)
    }
}

connectDB()
    .then(() => console.log("DB connected"))
    .catch(error => {
        console.error("Error connecting to DB:", error)
        process.exit(1)
    })


deleteData()
equipmentService.getAll().then(async (equipments) => {
    await loadData(equipments)

    disconnectDB()
        .then(() => console.log("DB disconnected"))
        .catch(error => {
            console.error("Error disconnecting to DB:", error)
            process.exit(1)
        })
    process.exit()

}).catch(err => console.log(err))

