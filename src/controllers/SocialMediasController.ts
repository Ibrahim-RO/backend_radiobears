import { Request, Response } from "express";
import SocialMedias from "../models/SocialMedias";

export class SocialMediasController {

    static getAllSocialMedias = async (req: Request, res: Response) => {
        try {
            const socialMedias = await SocialMedias.findAll({  order: [['id', 'ASC']] })
            res.send(socialMedias)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static createSocialMedia = async (req: Request, res: Response) => {
        try {
            const { name } = req.body

            const nameExists = await SocialMedias.findOne({ where: { name } })
            if (nameExists) {
                const error = new Error('Red social ya existente')
                res.status(409).json({ error: error.message })
                return
            }

            const social = new SocialMedias(req.body)
            await social.save()

            res.status(201).send("Red social creada correctamente")
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }

    }

    static getSocialById = async (req: Request, res: Response) => {
        try {
            res.status(200).send(req.social)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateSocialMedia = async (req: Request, res: Response) => {
        try {
            req.social.url = req.body.url || req.social.url
            await req.social.save()
            res.send('Red social actualizado')
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static isActiveSocialMedia = async (req: Request, res: Response) => {
        try {
            req.social.isActive = !req.social.isActive
            await req.social.save()

            let message = req.social.isActive ? 'activado' : 'desactivado'
            res.status(200).send(`Red social ${message}`)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static deleteSocial = async (req: Request, res: Response) => {
        try {
            await req.social.destroy()

            res.send('Red social eliminada')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

}