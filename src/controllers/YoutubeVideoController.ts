import { Request, Response } from "express";
import VideoYoutube from "../models/VideoYoutube";

export class YoutubeVideoController {

    static getAllYoutubeVideos = async (req: Request, res: Response) => {
        try {
            const videos = await VideoYoutube.findAll({ order: [['createdAt', 'DESC']] })
            res.send(videos)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    
    static createYoutubeVideo = async (req: Request, res: Response) => {
        try {
            const video = new VideoYoutube(req.body)
            await video.save()
            res.status(201).send('Video creado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getVideoById = async (req: Request, res: Response) => {
        try {
            res.send(req.video)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static updateYoutubeVideo = async (req: Request, res: Response) => {
        try {
            req.video.title = req.body.title
            req.video.description = req.body.description
            req.video.url = req.body.url
            req.video.youtube_link = req.body.youtube_link
            req.video.short = req.body.short
            
            await req.video.save()
            res.send('Video actualizado correctamente') 
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static deleteYoutubeVideo = async (req: Request, res: Response) => {
        try {
            await req.video.destroy()
            res.send('Video eliminado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
        
}