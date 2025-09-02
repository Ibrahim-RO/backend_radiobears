import { Request, Response, NextFunction } from "express";
import VideoYoutube from "../models/VideoYoutube";

declare global {
    namespace Express {
        interface Request {
            video: VideoYoutube
        }
    }
}

export const videoExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const video = await VideoYoutube.findByPk(id)
        if(!video) {
            return res.status(404).json({error: 'Video no encontrado'})
        }

        req.video = video
        next()

    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}