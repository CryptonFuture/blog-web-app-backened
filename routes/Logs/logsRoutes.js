import express from "express"
import { getLogs } from '../../controllers/Logs/logsController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getLogs', auth, getLogs)

export default router