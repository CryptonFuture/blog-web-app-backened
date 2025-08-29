import express from "express"
import { getRoles, getRole } from '../../controllers/Role/roleController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getRoles', getRoles)
router.get('/getRole', auth, getRole)

export default router