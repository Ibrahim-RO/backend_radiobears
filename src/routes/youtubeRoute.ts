import { Router } from "express";
import { YoutubeVideoController } from "../controllers/YoutubeVideoController";
import { handleInputErrors } from "../middleware/validation";
import { body, param } from "express-validator";
import { videoExists } from "../middleware/youtubeVideo";

const router = Router()

router.get('/videos-youtube',
    YoutubeVideoController.getAllYoutubeVideos
)

router.post('/create-video',
    body('title')
        .notEmpty().withMessage('Título obligatorio'),
    body('description')
        .notEmpty().withMessage('Descripción obligatoria'),
    body('url')
        .notEmpty().withMessage('Url obligatorio'),
    body('youtube_link')
        .notEmpty().withMessage('URL de youtube obligatorio'),
    body('short')
        .notEmpty().withMessage('Campo obligatorio'),
    handleInputErrors,
    YoutubeVideoController.createYoutubeVideo
)

router.param('id', videoExists)

router.get('/video-youtube/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    handleInputErrors,
    YoutubeVideoController.getVideoById
)

router.put('/update-video/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    body('title')
        .notEmpty().withMessage('Título obligatorio'),
    body('description')
        .notEmpty().withMessage('Descripción obligatoria'),
    body('url')
        .notEmpty().withMessage('Url obligatorio'),
    body('youtube_link')
        .notEmpty().withMessage('URL de youtube obligatorio'),
    body('short')
        .notEmpty().withMessage('Campo obligatorio'),
    handleInputErrors,
    YoutubeVideoController.updateYoutubeVideo
)

router.delete('/delete-video/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    handleInputErrors,
    YoutubeVideoController.deleteYoutubeVideo
)

export default router