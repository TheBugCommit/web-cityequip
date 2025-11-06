import path from 'path'
import 'dotenv/config'
import express from 'express'
import { fileURLToPath } from 'url'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import routes from './routes/index.js'
import middlewares from './middlewares/index.js'
import { getMenuForRole } from './config/menu.config.js'
import { flash } from './helpers/flash.helper.js'
import initPassport from './service/passport.service.js'
import passport from 'passport'
import equipmentCache from './cache/equipment.cache.js'
import buildPaths from './helpers/buildPaths.helper.js'

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
app.use(passport.session());

(async () => {
  await equipmentCache.init()
  equipmentCache.scheduleAutoSync(5 * 60 * 1000)
})()

app.use((req, res, next) => {
  const role = req.user?.role || 'guest'
  res.locals.menu = getMenuForRole(role)
  res.locals.currentPath = req.path
  res.locals.user = req.user || null
  res.locals.unicTypes = equipmentCache.getAllTypes()
  res.locals.messages = req.session.messages || {}
  req.session.messages = {}
  next()
})

app.use(flash)
app.use(middlewares.redirectBack)

const prefixes = {
  home: '/',
  auth: '/auth',
  equipment: '/equipment',
  user: '/user'
}

app.locals.paths = {
  home: buildPaths(prefixes.home, routes.home.paths),
  auth: buildPaths(prefixes.auth, routes.auth.paths),
  // equipment: buildPaths(prefixes.equipment, equipmentPaths),
  // user: buildPaths(prefixes.user, userPaths)
}

app.use(prefixes.home, routes.home.router)
app.use(prefixes.auth, routes.auth.router)
app.use(prefixes.equipment, routes.equipment)
app.use(prefixes.user, routes.user)

app.use((req, res, next) => {
  const err = new Error('Page not found')
  err.status = 404
  next(err)
})

app.use(middlewares.errorHandler)

export default app