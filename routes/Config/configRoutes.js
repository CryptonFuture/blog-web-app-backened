import express from "express"
import { getLogsConfig, updateLogs, getTrackingEnabledLogs } from '../../controllers/LogsConfig/LogsConfigController.js'

const router = express.Router()

router.get('/getLogsConfig', getLogsConfig)
router.put('/updateLogs/:id', updateLogs)
router.get('/getTrackingEnabledLogs', getTrackingEnabledLogs)

export default router