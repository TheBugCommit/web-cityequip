import dotenv from 'dotenv'
import express from 'express'
import router from './routes/router.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)

export default app