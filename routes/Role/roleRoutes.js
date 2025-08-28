import express from "express"
import { getRoles } from '../../controllers/Role/roleController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getRoles', getRoles)

export default router