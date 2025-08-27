import express from "express"
import { addRequest, getRequest, approvedRequest } from '../../controllers/Request/requestController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addRequest', addRequest)
router.get('/getRequest', auth, getRequest)
router.put('/approvedRequest/:id', auth, approvedRequest)

export default router