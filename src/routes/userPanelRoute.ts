import { Router } from "express";
import { body } from "express-validator"
import { handleInputErrors } from "../middleware/validation";
import { UserPanelController } from "../controllers/UserPanelController";

const router = Router()

router.get('/',
    UserPanelController.getAllUsers
)

router.post('/create-account',
    body('email')
        .isEmail().withMessage('Email no válido'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña debe ser mínimo de 8 caracteres'),
    body('password_confirmation')
        .notEmpty().withMessage('Confirmación de la contraseña obligatoria'),
    handleInputErrors,
    UserPanelController.createAccount
)

router.post('/login', 
    body('email')
        .isEmail().withMessage('Email no válido'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña debe ser mínimo de 8 caracteres'),
    handleInputErrors,
    UserPanelController.login
)

export default router