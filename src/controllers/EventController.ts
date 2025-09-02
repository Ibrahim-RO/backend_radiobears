import { Request, Response } from "express";
import Events from "../models/Event";
import { v4 as uuid } from 'uuid'
import cloudinary from "../config/cloudinary";

export class EventController {

    static getAllEvents = async (req: Request, res: Response) => {
        try {
            const events = await Events.findAll({ order: ['id'] })
            res.send(events)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


    static createEvent = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;

            const eventExists = await Events.findOne({ where: { name } });
            if (eventExists) {
                res.status(409).json({ error: "Evento existente" });
                return
            }

            let imageUrl: string | null = null;

            if (req.file) {
                imageUrl = await new Promise<string | null>((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { public_id: uuid() },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result?.secure_url || null);
                        }
                    );
                    stream.end(req.file.buffer);
                });
            }

            const event = new Events(req.body)
            event.image = imageUrl

            await event.save()
    
            res.status(201).send("Evento creado correctamente");

        } catch (error) {
            res.status(500).json({ error: "Hubo un error al crear el evento" });
        }
    };

    static getEventById = async (req: Request, res: Response) => {
        try {
            res.send(req.event)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateEvent = async (req: Request, res: Response) => {
        try {
            const { name, description, dateEvent } = req.body;

            let imageUrl = req.event.image; 
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

            req.event.name = name
            req.event.description = description
            req.event.dateEvent = dateEvent
            req.event.image = imageUrl

            await req.event.save()

            res.status(200).json("Evento actualizado correctamente");
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Hubo un error al actualizar el evento" });
        }
    };


    static deleteEvent = async (req: Request, res: Response) => {
        try {
            await req.event.destroy()
            res.send('Evento eliminado correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

}