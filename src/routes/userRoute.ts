import { Router } from "express";
import { body } from "express-validator"
import { UserController } from "../controllers/UserController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.get('/users', 
    UserController.getAllUsers
)

router.post('/register', 
    body('username')
        .notEmpty()
        .withMessage("El username es obligatorio"),
    body('password')
        .isLength({min: 8})
        .withMessage("El password es obligatorio"),
    handleInputErrors,
    UserController.createAccount
)

router.post('/login', 
    body('username')
        .notEmpty()
        .withMessage("El username es obligatorio"),
    body('password')
        .isLength({min: 8})
        .withMessage("El password es obligatorio"),
    handleInputErrors,
    UserController.login
)


export default router