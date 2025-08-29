import express from "express"
import { countAll, getSideBarRoutes, getSideBarRole } from '../../controllers/Dashboard/dashboardController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/countAll', auth, countAll)
router.get('/getSideBarRoutes', auth, getSideBarRoutes)
router.get('/getSideBarRole', auth, getSideBarRole)

export default router