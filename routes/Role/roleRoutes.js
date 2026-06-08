import express from "express"
import { getRoles, getRole } from '../../controllers/Role/roleController.js'
import { auths } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getRoles', getRoles)
router.get('/getRole', auths, getRole)

export default router