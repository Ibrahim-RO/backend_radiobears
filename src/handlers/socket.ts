import { Server, Socket } from "socket.io"
import jwt, { JwtPayload } from "jsonwebtoken"
import Message from "../models/Message"
import User from "../models/User"

interface DecodedToken extends JwtPayload {
  id: string
  username: string
}

export const configureSocket = (io: Server) => {
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token

    if (!token) return next(new Error("No token provided"))

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

      if (typeof decoded === "string") {
        return next(new Error("Invalid token format"))
      }

      const user = decoded as DecodedToken

      // Buscar usuario en base de datos para asegurar que existe
      const existingUser = await User.findByPk(user.id)
      if (!existingUser) return next(new Error("User not found"))

      socket.user = {
        id: existingUser.id,
        username: existingUser.username,
      }

      next()
    } catch (err) {
      console.error("Error verifying token:", err)
      return next(new Error("Unauthorized"))
    }
  })

  io.on("connection", async (socket: Socket) => {
    console.log(`Cliente conectado: ${socket.user?.username}`)

    // Obtener mensajes con el usuario incluido
    const messages = await Message.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "ASC"]],
      limit: 50,
    })

    // Transformar los mensajes para incluir username directo
    const chatHistory = messages.map((msg) => ({
      _id: msg.id,
      content: msg.content,
      createdAt: msg.createdAt,
      username: msg.user?.username || "Desconocido",
    }))

    socket.emit("chatHistory", chatHistory)

    socket.on("chatMessage", async (content: string) => {
      if (!socket.user) return

      const newMessage = await Message.create({
        content,
        userId: socket.user.id,
      })

      // Volver a incluir username manualmente para el frontend
      io.emit("chatMessage", {
        _id: newMessage.id,
        content: newMessage.content,
        createdAt: newMessage.createdAt,
        username: socket.user.username,
      })
    })

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.user?.username}`)
    })
  })
}
