import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import { fileURLToPath } from 'url'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import router from './routes/index.js'
import middlewares from './middlewares/index.js'
import { getMenuForRole } from './config/menu.config.js'
import { flash } from './helpers/flash.helper.js'
import initPassport from './service/passport.service.js'
import passport from 'passport'

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
  name: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  })
}))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  const role = req.user?.role || 'guest'
  res.locals.menu = getMenuForRole(role)
  res.locals.currentPath = req.path
  res.locals.user = req.user || null;
  res.locals.messages = req.session.messages || {}
  req.session.messages = {}
  next()
})

app.use(flash)

app.use('/', router.home)
app.use('/auth', router.auth)
app.use('/equipments', router.equipment)
app.use('/user', router.user)
app.use('/admin', router.admin)

app.use(middlewares.errorHandler)

export default app