import { Socket, Server } from "socket.io"
import Message from "../models/Message"
import User from "../models/User"

/**
 * Carga los últimos 50 mensajes más recientes del chat
 */
export const loadChatHistory = async (socket: Socket) => {
    try {
        const messages = await Message.findAll({
            include: [{ model: User, attributes: ["username"] }],
            order: [["createdAt", "DESC"]], // ✅ Trae los más recientes primero
            limit: 50, // ✅ Solo los últimos 50
        })

        // ✅ Los revertimos para mostrar en orden cronológico (de viejo → nuevo)
        const chatHistory = messages.reverse().map((msg) => ({
            _id: msg.id,
            content: msg.content,
            createdAt: msg.createdAt,
            username: msg.user?.username || "Desconocido",
        }))

        socket.emit("chatHistory", chatHistory)
    } catch (error) {
        console.error("Error cargando historial del chat:", error)
    }
}

/**
 * Maneja el envío de nuevos mensajes y los emite a todos los usuarios conectados
 */
export const handleChatMessage = async (io: Server, socket: Socket, content: string) => {
    try {
        if (!socket.user) return

        const newMessage = await Message.create({
            content,
            userId: socket.user.id,
        })

        io.emit("chatMessage", {
            _id: newMessage.id,
            content: newMessage.content,
            createdAt: newMessage.createdAt,
            username: socket.user.username,
        })
    } catch (error) {
        console.error("Error al manejar mensaje:", error)
    }
}
