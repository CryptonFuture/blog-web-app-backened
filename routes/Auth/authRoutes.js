import express from "express"
import { register, login, logout } from '../../controllers/Auth/authController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', auth, register)
router.post('/login', login)
router.post('/logout', auth, logout)

export default router
