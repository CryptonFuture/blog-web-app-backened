import express from "express"
import { countAll } from '../../controllers/Dashboard/dashboardController.js'

const router = express.Router()

router.get('/countAll', countAll)

export default router