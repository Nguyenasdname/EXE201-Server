const express = require('express')
const connectDB = require('./config/database')
const cors = require('cors')

const userRouter = require('./modules/user/user.routes')
const authRouter = require('./modules/auth/auth.routes')
const emailRouter = require('./modules/email/email.routes')
const projectRouter = require('./modules/project/project.routes')
const projectPackageRouter = require('./modules/projectPackage/projectPackage.routes')

require('dotenv').config()
connectDB()

const app = express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/email/', emailRouter)
app.use('/project', projectRouter)
app.use('/projectPackage', projectPackageRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))