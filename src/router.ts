import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, login } from './handlers'
import { handleInputErrors } from './middleware/validation'

const router = Router()

router.get('/', (req, res) => {
    res.send("Hola")
})

router.post('/auth/register', 
    body('username')
        .notEmpty()
        .withMessage("El username es obligatorio"),
    body('password')
        .isLength({min: 8})
        .withMessage("El password es obligatorio"),
    handleInputErrors,
    createAccount
)

router.post('/auth/login', 
    body('username')
        .notEmpty()
        .withMessage("El username es obligatorio"),
    body('password')
        .isLength({min: 8})
        .withMessage("El password es obligatorio"),
    handleInputErrors,
    login
)

export default router