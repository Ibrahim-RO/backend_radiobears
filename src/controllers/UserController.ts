import { Request, Response } from "express"
import User from "../models/User"
import { hashPassword, verifyPassword } from "../utils/auth"
import { generateJWT } from "../utils/jwt"

export class UserController {

    static getAllUsers = async (req: Request, res: Response) => {
        try {
            const data = await User.findAll()
            res.send(data)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static createAccount = async (req: Request, res: Response) => {
        const { username, password } = req.body
        const userExists = await User.findOne({ where: { username } })
        if (userExists) {
            const error = new Error("El usuario ya existe")
            res.status(409).json({ error: error.message })
            return
        }

        const user = new User(req.body)
        user.password = await hashPassword(password)
        await user.save()

        res.status(201).send("Registro creado correctamente")
    }

    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body
        const user = await User.findOne({ where: { username } })
        if (!user) {
            const error = new Error("El usuario no existe")
            res.status(404).json({ error: error.message })
            return
        }

        const isPasswordCorrect = await verifyPassword(password, user.password)
        if (!isPasswordCorrect) {
            const error = new Error("Contraseña incorrecta")
            res.status(401).json({ error: error.message })
            return
        }

        const token = generateJWT({ id: user.id })

        res.send(token)
    }

}