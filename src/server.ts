import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'

// ROUTES
import userPanelRouter from './routes/userPanelRoute'
import userRouter from './routes/userRoute'
import socialMediasRouter from './routes/socialMediaRouter'
import eventRouter from './routes/eventRoute'
import hostRouter from './routes/hostRoute'
import associateRouter from './routes/associateRoute'
import youtubeRouter from './routes/youtubeRoute'
import { chatSocket } from './sockets/chatSocker'

connectDB()

const app = express()

app.use(cors(corsConfig))
app.use(express.json())

// ROUTES
app.use('/api/auth', userRouter)
app.use('/api/auth-panel', userPanelRouter)
app.use('/api/social', socialMediasRouter)
app.use('/api/event', eventRouter)
app.use('/api/host', hostRouter)
app.use('/api/associate', associateRouter)
app.use('/api/youtube', youtubeRouter)

// Servidor HTTP + Socket.IO
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: corsConfig })

// Configurar sockets
chatSocket(io)

export { app, httpServer }
