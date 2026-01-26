import express from "express"
import { countAll, getSideBarRoutes, getSideBarRole } from '../../controllers/Dashboard/dashboardController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/countAll', countAll)
router.get('/getSideBarRoutes', getSideBarRoutes)
router.get('/getSideBarRole', getSideBarRole)

export default router