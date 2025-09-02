import { Request, Response, NextFunction } from "express";
import Host from "../models/Host";

declare global {
    namespace Express {
        interface Request {
            hosts: Host
        }
    }
}

export const hostExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const host = await Host.findByPk(id)
        if(!host) {
            const error = new Error('Host no encontrado')
            res.status(404).json({error: error.message})
            return
        } 

        req.hosts = host
        next()

    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}