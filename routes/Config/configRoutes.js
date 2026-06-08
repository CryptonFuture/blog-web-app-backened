import express from "express"
import { getLogsConfig, updateLogs, getTrackingEnabledLogs, multipleUpdateLogs } from '../../controllers/LogsConfig/LogsConfigController.js'

const router = express.Router()

router.get('/getLogsConfig', getLogsConfig)
router.put('/updateLogs/:id', updateLogs)
router.get('/getTrackingEnabledLogs', getTrackingEnabledLogs)
router.put('/updateMultipleLogs', multipleUpdateLogs);

export default router