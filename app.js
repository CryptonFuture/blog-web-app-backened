import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import AuthRoutes from './routes/Auth/authRoutes.js'

dotenv.config()
const app = express()

app.use(bodyParser.json({limit: '1gb'}))
app.use(bodyParser.urlencoded({extended: false, limit: '1gb'}))
app.use(cors())

app.use('/api/v1', AuthRoutes)

app.get('/', () => {
     console.log('Service is working');
})

export {
 app
}