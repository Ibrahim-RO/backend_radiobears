import { Router } from 'express'
import { SocialMediasController } from '../controllers/SocialMediasController'
import { handleInputErrors } from '../middleware/validation'
import { body, param } from 'express-validator'
import { socialExists } from '../middleware/social'

const router = Router()

router.get('/social-medias',
    SocialMediasController.getAllSocialMedias
)

router.post('/create-social',
    body('name')
        .notEmpty().withMessage('El nombre de la red es obligatorio'),
    handleInputErrors,
    SocialMediasController.createSocialMedia
)

router.param('id', socialExists)

router.get('/social-media/:id',
    SocialMediasController.getSocialById
)

router.patch('/edit-social/:id', 
    param('id')
        .isInt().withMessage('ID no válido'),
    body('url')
        .notEmpty().withMessage('La url es obligatoria'),
    handleInputErrors,
    SocialMediasController.updateSocialMedia
)

router.patch('/toggle-social/:id', 
    param('id')
        .isInt().withMessage('ID no válido'),
    handleInputErrors,
    SocialMediasController.isActiveSocialMedia
)

router.delete('/delete-social/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    handleInputErrors,
    SocialMediasController.deleteSocial
)

export default router