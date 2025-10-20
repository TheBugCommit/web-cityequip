import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import { fileURLToPath } from 'url'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import router from './routes/router.js'
import middlewares from './middlewares/index.js'
import { getMenuForRole } from './config/menu.config.js'
import { flash } from './helpers/flash.helper.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: process.env.SESSION_SECRET,
  key: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  })
}))

app.use((req, res, next) => {
  const role = req.user?.role || 'guest'
  res.locals.menu = getMenuForRole(role)
  res.locals.currentPath = req.path
  next()
})

app.use((req, res, next) => {
  res.locals.messages = req.session.messages || {}
  req.session.messages = {}
  next()
})

app.use(flash)

app.use('/', router)
app.use(middlewares.errorHandler)

export default app