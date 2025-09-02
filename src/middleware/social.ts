import { Request, Response, NextFunction } from "express";
import SocialMedias, { ISocialMedias } from "../models/SocialMedias";

declare global {
    namespace Express {
        interface Request {
            social: SocialMedias
        }
    }
}

export const socialExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const social = await SocialMedias.findByPk(id)
        if (!social) {
            const error = new Error('Red social no encontrado')
            res.status(404).json({ error: error.message })
            return
        }

        req.social = social
        next()

    } catch (error) {
        res.status(500).json({ error: "Hubo un error" })
    }
}