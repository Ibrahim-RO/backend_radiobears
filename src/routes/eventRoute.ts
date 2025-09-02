import { Router } from "express";
import { handleInputErrors } from "../middleware/validation";
import { EventController } from "../controllers/EventController";
import { body, param } from "express-validator";
import { eventExists } from "../middleware/event";
import { upload } from "../middleware/upload";

const router = Router()

router.get('/events',
    EventController.getAllEvents
)

router.post('/create-event',
    upload.single('image'),
    body('name')
        .notEmpty().withMessage('Nombre del evento obligatorio'),
    body('description')
        .notEmpty().withMessage('Descripción obligatoria'),
    body('dateEvent')
        .notEmpty().withMessage('Fecha no válida'),
    handleInputErrors,
    EventController.createEvent
)

router.param('id', eventExists)

router.get('/event/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    handleInputErrors,
    EventController.getEventById
)

router.put('/edit-event/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    upload.single('image'),
    body('name')
        .notEmpty().withMessage('Nombre del evento obligatorio'),
    body('description')
        .notEmpty().withMessage('Descripción obligatoria'),
    body('dateEvent')
        .notEmpty().withMessage('Fecha no válida'),
    handleInputErrors,
    EventController.updateEvent
)


router.delete('/delete-event/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    handleInputErrors,
    EventController.deleteEvent
)

export default router