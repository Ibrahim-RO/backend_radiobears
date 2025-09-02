import { Request, Response } from "express";
import UserPanel from "../models/UserPanel";
import { hashPassword, verifyPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export class UserPanelController {

    static getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await UserPanel.findAll({ order: [['id', "DESC"]] })
            res.send(users)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static createAccount = async (req: Request, res: Response) => {
        try {
            const { email, password, password_confirmation } = req.body
            const userExists = await UserPanel.findOne({ where: { email } })
            if (userExists) {
                const error = new Error('Usuario ya existente')
                res.status(409).json({ error: error.message })
                return
            }

            const user = new UserPanel(req.body)

            if (password !== password_confirmation) {
                const error = new Error('Las contraseñas no son iguales')
                res.status(409).json({ error: error.message })
                return
            }

            user.password = await hashPassword(password)
            await user.save()

            res.status(201).send('Usuario creado correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await UserPanel.findOne({ where: { email } })
            if(!user){
                const error = new Error('Usuario no encontrado')
                res.status(404).json({error: error.message})
                return
            }

            const isPasswordCorrect = await verifyPassword(password, user.password)
            if(!isPasswordCorrect) {
                const error = new Error('Usuario o contraseña incorrectas')
                res.status(401).json({error: error.message})
                return
            }

            const token = generateJWT({id: user.id})
            res.send(token)

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

}