import { Socket } from "socket.io"
import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../models/User"

interface DecodedToken extends JwtPayload {
    id: string
    username: string
}

export const socketAuth = async (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth.token
    if (!token) return next(new Error("No token provided"))

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

        if (typeof decoded === "string") {
            return next(new Error("Invalid token format"))
        }

        const user = decoded as DecodedToken
        const existingUser = await User.findByPk(user.id)
        if (!existingUser) return next(new Error("User not found"))

        // Guardamos los datos del usuario en el socket
        socket.user = {
            id: existingUser.id,
            username: existingUser.username,
        }

        next()
    } catch (err) {
        console.error("Error verifying token:", err)
        return next(new Error("Unauthorized"))
    }
}
