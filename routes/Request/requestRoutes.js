import express from "express"
import { addRequest } from '../../controllers/Request/requestController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addRequest', addRequest)

export default router