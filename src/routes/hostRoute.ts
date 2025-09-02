import { Router } from "express";
import { handleInputErrors } from "../middleware/validation";
import { HostController } from "../controllers/HostController";
import { body, param } from "express-validator";
import { hostExists } from "../middleware/host";
import { upload } from "../middleware/upload";

const router = Router()

router.get('/hosts',
    HostController.getAllHost
)

router.post('/create-host',
    upload.single('image'),
    body('name')
        .notEmpty().withMessage('Nombre obligatorio'),
    body('age')
        .notEmpty().withMessage('Edad no válido'),
    body('description')
        .notEmpty().withMessage('Descripción obligatoria'),
    handleInputErrors,
    HostController.createHost
)

router.param('id', hostExists)

router.get('/host/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    handleInputErrors,
    HostController.getHostById
)

router.put('/edit-host/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    upload.single('image'),
    body('name')
        .notEmpty().withMessage('Nombre obligatorio'),
    body('age')
        .notEmpty().withMessage('Edad no válido'),
    body('description')
        .notEmpty().withMessage('Descripción obligatoria'),
    handleInputErrors,
    HostController.updateHost
)

router.delete('/delete-host/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    handleInputErrors,
    HostController.deleteHost
)

export default router