import express from "express"
import { getLogs, countLogs } from '../../controllers/Logs/logsController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getLogs', getLogs)
router.get('/countLogs', countLogs)

export default router