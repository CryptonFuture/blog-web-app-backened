import express from "express"
import { register, login, logout, resetPassword, forgotPassword } from '../../controllers/Auth/authController.js'
import { auth } from '../../middleware/authMiddleware.js'
import { upload } from '../../middleware/multerConfig.js'

const router = express.Router()

router.post('/register', auth, upload.single('image'), register)
router.post('/login', login)
router.post('/logout', auth, logout)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)

export default router
