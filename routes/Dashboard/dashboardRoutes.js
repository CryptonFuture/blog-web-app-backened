import express from "express"
import { countAll, getSideBarRoutes, getSideBarRole, getSidebar } from '../../controllers/Dashboard/dashboardController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/countAll', countAll)
router.get('/getSideBarRoutes', getSideBarRoutes)
router.get('/getSideBarRole', getSideBarRole)
router.get('/getSideBar', getSidebar)

export default router