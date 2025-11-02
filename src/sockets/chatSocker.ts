import { Server, Socket } from "socket.io"
import { socketAuth } from "../middleware/socketAuth"
import { handleChatMessage, loadChatHistory } from "../controllers/ChatController"

export const chatSocket = (io: Server) => {
    // Middleware de autenticación
    io.use(socketAuth)

    // Eventos de conexión
    io.on("connection", async (socket: Socket) => {
        console.log(`🟢 Cliente conectado: ${socket.user?.username}`)

        await loadChatHistory(socket)

        socket.on("chatMessage", async (content: string) => {
            await handleChatMessage(io, socket, content)
        })

        socket.on("disconnect", () => {
            console.log(`🔴 Cliente desconectado: ${socket.user?.username}`)
        })
    })
}
