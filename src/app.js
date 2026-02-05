const express = require('express')
const connectDB = require('./config/database')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io');

const userRouter = require('./modules/user/user.routes')
const authRouter = require('./modules/auth/auth.routes')
const emailRouter = require('./modules/email/email.routes')
const projectRouter = require('./modules/project/project.routes')
const projectPackageRouter = require('./modules/projectPackage/projectPackage.routes')
const categoryRouter = require('./modules/category/category.routes')
const notificationRouter = require('./modules/notification/notification.routes')
const donationRouter = require('./modules/donation/donation.routes')

require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://fundtalk.vercel.app'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

connectDB()
app.use(express.json())

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://fundtalk.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/email/', emailRouter)
app.use('/project', projectRouter)
app.use('/projectPackage', projectPackageRouter)
app.use('/category', categoryRouter)
app.use('/notification', notificationRouter)
app.use('/donation', donationRouter)

require('./modules/notification/notification.socket')(io);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))