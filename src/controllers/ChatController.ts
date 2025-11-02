import { Socket, Server } from "socket.io"
import Message from "../models/Message"
import User from "../models/User"

export const loadChatHistory = async (socket: Socket) => {
    const messages = await Message.findAll({
        include: [{ model: User, attributes: ["username"] }],
        order: [["createdAt", "ASC"]],
        limit: 50,
    })

    const chatHistory = messages.map((msg) => ({
        _id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt,
        username: msg.user?.username || "Desconocido",
    }))

    socket.emit("chatHistory", chatHistory)
}

export const handleChatMessage = async (io: Server, socket: Socket, content: string) => {
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
}
