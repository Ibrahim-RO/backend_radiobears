import { Request, Response } from "express";
import Host from "../models/Host";
import cloudinary from "../config/cloudinary";
import { v4 as uuid } from 'uuid'

export class HostController {

    static getAllHost = async (req: Request, res: Response) => {
        try {
            const hosts = await Host.findAll()
            res.send(hosts)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static createHost = async (req: Request, res: Response) => {
        try {
            const { name } = req.body
            const hostExists = await Host.findOne({ where: { name } })

            if (hostExists) {
                const error = new Error('Host ya existente')
                res.status(409).json({ error: error.message })
                return
            }

            let imageUrl: string | null = null

            if (req.file) {
                imageUrl = await new Promise<string | null>((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { public_id: uuid() },
                        (error, result) => {
                            if (error) return reject(error)
                            resolve(result?.secure_url || null)
                        }
                    )
                    stream.end(req.file.buffer)
                })
            }

            const host = new Host(req.body)
            host.image = imageUrl

            await host.save()

            res.status(201).send('Host creado correctamente')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al crear el host' })
        }
    }

    static getHostById = async (req: Request, res: Response) => {
        try {
            res.send(req.hosts)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateHost = async (req: Request, res: Response) => {
        try {
            const { name, description, age } = req.body;

            let imageUrl = req.hosts.image;
            if (req.file) {
                const result = await new Promise<any>((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { public_id: uuid() },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.end(req.file.buffer);
                });
                imageUrl = result.secure_url;
            }

            req.hosts.name = name
            req.hosts.age = age
            req.hosts.description = description
            req.hosts.image = imageUrl
            await req.hosts.save()

            res.send('Host actualizado correctamente')
        } catch (error) {
            res.status(500).json({ error: error.message})
        }
    }

    static deleteHost = async (req: Request, res: Response) => {
        try {
            await req.hosts.destroy()
            res.send('Host eliminado correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

}