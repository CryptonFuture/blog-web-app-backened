import express from "express"
import { getLogs, countLogs } from '../../controllers/Logs/logsController.js'
import { auths } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getLogs', auths, getLogs)
router.get('/countLogs', auths, countLogs)

export default router