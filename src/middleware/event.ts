import { Request, Response, NextFunction } from "express";
import Events from "../models/Event";

declare global {
    namespace Express {
        interface Request {
            event: Events
        }
    }
}

export const eventExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const event = await Events.findByPk(id)
        if (!event) {
            const error = new Error('Evento no encontrado')
            res.status(404).json({ error: error.message })
            return
        }

        req.event = event
        next()

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}