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
import configRoutes from './routes/Config/configRoutes.js'
import moduleRoutes from './routes/Module/moduleRoutes.js'
import otpRoutes from "./routes/Otp/otpRoutes.js";
import qrCodeRoutes from "./routes/QrCode/qrCodeRoutes.js";
import userRoleRoutes from "./routes/Role/userRoleRoutes.js";

import http from "http";
import { Server } from "socket.io";
import Message from './models/Message/messageModel.js';
import path from 'path'
import session from "express-session";
import passport from "passport";
import configurePassport from "./utils/passport.js";
import googleUserRoutes from "./routes/GoogleUser/googleUserRoutes.js";
import cookieParser from 'cookie-parser';

configurePassport()

dotenv.config()

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});


io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinRoom", (roomData) => {
    const { room, username } = roomData;
    socket.join(room);
    socket.room = room;
    socket.username = username;

    console.log(`User ${username} joined room: ${room}`);
    socket.emit("joinedRoom", room);

    socket.to(room).emit("systemMessage", {
      text: `👋 ${username} has joined the room.`,
    });
  });

  socket.on("leaveRoom", () => {
    const { room, username } = socket;
    if (room && username) {
      socket.leave(room);
      console.log(`User ${username} left room: ${room}`);

      socket.to(room).emit("systemMessage", {
        text: `🚪 ${username} has left the room.`,
      });

      socket.emit("leftRoom", room);
    }
  });

  socket.on("disconnect", () => {
    const { room, username } = socket;
    if (room && username) {
      console.log(`User ${username} disconnected from room: ${room}`);

      socket.to(room).emit("systemMessage", {
        text: `❌ ${username} has disconnected.`,
      });
    }
  });

  socket.on("chat message", async ({ sender, message }) => {
    console.log(`Message in room ${room}: ${message}`);

    const newMessage = await Message.create({ sender, message });
    io.to(room).emit("chat message", newMessage);
  });
});

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json({limit: '1gb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '1gb'}))

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
app.use('/api/v1', configRoutes);
app.use('/api/v1', moduleRoutes);
app.use('/api/v1', otpRoutes);
app.use('/api/v1', qrCodeRoutes)
app.use('/api/v1', userRoleRoutes)

app.use("/auth", googleUserRoutes);

app.get('/', () => {
     console.log('Service is working');
})

app.get('/open-item/:id', (req, res) => {
  res.send(`<html><body>
    <h3>Open item</h3>
    <p>Use your frontend scanner or API to view item: ID = ${req.params.id}</p>
  </body></html>`);
});

export {
 app
}