import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import auth from './routes/authRoutes.js'
import users from './routes/userRoutes.js'
import posts from './routes/postRoutes.js'
import comments from './routes/commentRoutes.js'
import stories from './routes/storyRoutes.js'
import notifications from './routes/notificationRoutes.js'

const app = express()
app.set('trust proxy', 1)
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json()); app.use(cookieParser())
app.use('/uploads', express.static(path.resolve('uploads'), { setHeaders: (r) => r.setHeader('Cross-Origin-Resource-Policy', 'cross-origin') }))
app.use('/api/auth', auth); app.use('/api/users', users); app.use('/api/posts', posts)
app.use('/api/comments', comments); app.use('/api/stories', stories); app.use('/api/notifications', notifications)
app.use(notFound); app.use(errorHandler)

await connectDB()
app.listen(process.env.PORT || 5000, () => console.log(`API on :${process.env.PORT || 5000}`))
