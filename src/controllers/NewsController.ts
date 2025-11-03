import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import cloudinary from "../config/cloudinary";
import News from "../models/News";

export class NewsController {
    static getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const news = await News.findAll({ order: [["id", "DESC"]] });
            res.status(200).json(news);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al obtener las noticias" });
        }
    };

    static create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, content } = req.body;

            const existingNews = await News.findOne({ where: { title } });
            if (existingNews) {
                res.status(409).json({ error: "Ya existe una noticia con ese título" });
                return;
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

            const news = await News.create({
                title,
                content,
                image: imageUrl,
            });

            res.status(201).json({
                message: "Noticia creada correctamente",
                news,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al crear la noticia" });
        }
    };

    static getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const news = await News.findByPk(id);
            if (!news) {
                res.status(404).json({ error: "Noticia no encontrada" });
                return;
            }
            res.status(200).json(news);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al obtener la noticia" });
        }
    };

    static update = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { title, content } = req.body;

            const news = await News.findByPk(id);
            if (!news) {
                res.status(404).json({ error: "Noticia no encontrada" });
                return;
            }

            let imageUrl = news.image;

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

            await news.update({ title, content, image: imageUrl });

            res.status(200).json({ message: "Noticia actualizada correctamente", news });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al actualizar la noticia" });
        }
    };

    static delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const news = await News.findByPk(id);
            if (!news) {
                res.status(404).json({ error: "Noticia no encontrada" });
                return;
            }

            await news.destroy();
            res.status(200).json({ message: "Noticia eliminada correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Hubo un error al eliminar la noticia" });
        }
    };
}
