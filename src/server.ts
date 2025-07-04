import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import router from './router'
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'
import { configureSocket } from './handlers/socket'

connectDB()

const app = express()

app.use(cors(corsConfig))
app.use(express.json())
app.use('/', router)

// Crear servidor HTTP para usar con Socket.IO
const httpServer = createServer(app)

// Crear instancia de Socket.IO
const io = new Server(httpServer, {
  cors: corsConfig,
})

// Configurar los sockets
configureSocket(io)

// Exportar ambos
export { app, httpServer }
