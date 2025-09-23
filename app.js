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
import categoryRoutes from './routes/Category/categoryRoutes.js'
import contactUsRoutes from './routes/contactUs/contactUsRoutes.js'
import messageRoutes from './routes/Message/messageRoutes.js';
import http from 'http';
import { Server } from 'socket.io';
import Message from './models/Message/messageModel.js';
import path from 'path'



dotenv.config()
const app = express()

const server = http.createServer(app);

const io = new Server(server, {
  cors: { 
          origin: 'http://localhost:5173/', 
          methods: ['GET', 'POST'],
          credentials: true 
     }
})


io.on("connection", (socket) => {
  console.log("🔵 User connected:", socket.id);

  socket.on("chatMessage", async (data) => {
    try {
      const newMessage = new Message({
        sender: data.sender,
        message: data.message,
      });
      await newMessage.save();

      io.emit("chatMessage", newMessage);
    } catch (error) {
      console.error("❌ Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});



const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api/v1', categoryRoutes)
app.use('/api/v1', contactUsRoutes)
app.use('/api/v1', messageRoutes);

app.get('/', () => {
     console.log('Service is working');
})


export {
 app
}