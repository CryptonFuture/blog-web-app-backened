import express from "express"
import { addRequest, getRequest, getRequestById, countRequest, approvedRequest, rejectRequest } from '../../controllers/Request/requestController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addRequest', addRequest)
router.get('/getRequest', auth, getRequest)
router.get('/countRequest', auth, countRequest)
router.get('/getRequestById/:id', auth, getRequestById)
router.put('/approvedRequest/:id', auth, approvedRequest)
router.put('/rejectRequest/:id', auth, rejectRequest)

export default router