import app from './app.js'
import { connectDB } from './config/db.config.js'

connectDB()
  .then(() => console.log("DB connected"))
  .catch(error => {
    console.error("Error connecting to DB:", error)
    process.exit(1)
  })

const PORT = Number(process.env.PORT) || 3000
app.set('port', PORT)
const server = app.listen(PORT, () => {
  console.log(`Express running at PORT ${PORT} **`)
})