import express from "express"
import { getEndPointRoutes } from '../../controllers/Dashboard/endPointController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getEndPoint', auth, getEndPointRoutes)

export default router