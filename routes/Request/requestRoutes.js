import express from "express"
import { addRequest, getActiveRequest, getInActiveRequest, getRequestById, countActiveRequest, countInActiveRequest, approvedByRequest, approvedAtRequest, rejectByRequest, rejectAtRequest } from '../../controllers/Request/requestController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addRequest', addRequest)
router.get('/getActiveRequest', auth, getActiveRequest)
router.get('/getInActiveRequest', auth, getInActiveRequest)
router.get('/countActiveRequest', auth, countActiveRequest)
router.get('/countInActiveRequest', auth, countInActiveRequest)
router.get('/getRequestById/:id', auth, getRequestById)
router.put('/approvedByRequest/:id', auth, approvedByRequest)
router.put('/approvedAtRequest/:id', auth, approvedAtRequest)
router.put('/rejectByRequest/:id', auth, rejectByRequest)
router.put('/rejectAtRequest/:id', auth, rejectAtRequest)

export default router