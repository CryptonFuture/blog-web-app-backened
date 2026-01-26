import express from "express"
import { addRequest, getActiveRequest, approvedAt, rejectAt, approvedBy, rejectBy, getInActiveRequest, getRequestById, countActiveRequest, countInActiveRequest, approvedByRequest, approvedAtRequest, rejectByRequest, rejectAtRequest } from '../../controllers/Request/requestController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addRequest', addRequest)
router.get('/getActiveRequest', getActiveRequest)
router.get('/getInActiveRequest', getInActiveRequest)
router.get('/countActiveRequest', countActiveRequest)
router.get('/countInActiveRequest', countInActiveRequest)
router.get('/getRequestById/:id', getRequestById)
router.put('/approvedByRequest/:id', approvedByRequest)
router.put('/approvedAtRequest/:id', approvedAtRequest)
router.put('/rejectByRequest/:id', rejectByRequest)
router.put('/rejectAtRequest/:id', rejectAtRequest)
router.put('/approvedBy/:id', approvedBy)
router.put('/rejectBy/:id', rejectBy)
router.put('/approvedAt/:id', approvedAt)
router.put('/rejectAt/:id', rejectAt)

export default router