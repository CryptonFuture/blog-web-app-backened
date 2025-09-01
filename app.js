import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import AuthRoutes from './routes/Auth/authRoutes.js'
import PostRoutes from './routes/Post/postRoutes.js'
import TagRoutes from './routes/Tag/tagRoutes.js'
import PageRoutes from './routes/Pages/pageRoutes.js'
import UserRoutes from './routes/User/userRoutes.js'
import countRoutes from './routes/Dashboard/dashboardRoutes.js'
import endPointRoutes from './routes/Dashboard/endPointRoutes.js'
import logsRoutes from './routes/Logs/logsRoutes.js'
import requestRoutes from './routes/Request/requestRoutes.js'
import roleRoutes from './routes/Role/roleRoutes.js'
import permissionRoutes from './routes/Permission/permissionRoutes.js'

dotenv.config()
const app = express()

app.use(bodyParser.json({limit: '1gb'}))
app.use(bodyParser.urlencoded({extended: false, limit: '1gb'}))
app.use(cors())

app.use('/api/v1', AuthRoutes)
app.use('/api/v1', PostRoutes)
app.use('/api/v1', TagRoutes)
app.use('/api/v1', PageRoutes)
app.use('/api/v1', UserRoutes)
app.use('/api/v1', countRoutes)
app.use('/api/v1', endPointRoutes)
app.use('/api/v1', logsRoutes)
app.use('/api/v1', requestRoutes)
app.use('/api/v1', roleRoutes)
app.use('/api/v1', permissionRoutes)

app.get('/', () => {
     console.log('Service is working');
})

export {
 app
}