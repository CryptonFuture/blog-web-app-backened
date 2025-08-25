import express from "express"
import { getLogs, countLogs } from '../../controllers/Logs/logsController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getLogs', auth, getLogs)
router.get('/countLogs', auth, countLogs)

export default router