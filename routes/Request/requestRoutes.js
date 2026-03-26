import express from "express"
import { addRequest, getActiveRequest, approvedAt, rejectAt, approvedBy, rejectBy, getInActiveRequest, getRequestById, countActiveRequest, countInActiveRequest, approvedByRequest, approvedAtRequest, rejectByRequest, rejectAtRequest } from '../../controllers/Request/requestController.js'
import { auths } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addRequest', auths, addRequest)
router.get('/getActiveRequest', auths, getActiveRequest)
router.get('/getInActiveRequest', auths, getInActiveRequest)
router.get('/countActiveRequest', auths, countActiveRequest)
router.get('/countInActiveRequest', auths, countInActiveRequest)
router.get('/getRequestById/:id', auths, getRequestById)
router.put('/approvedByRequest/:id', auths, approvedByRequest)
router.put('/approvedAtRequest/:id', auths, approvedAtRequest)
router.put('/rejectByRequest/:id', auths, rejectByRequest)
router.put('/rejectAtRequest/:id', auths, rejectAtRequest)
router.put('/approvedBy/:id', auths, approvedBy)
router.put('/rejectBy/:id', auths, rejectBy)
router.put('/approvedAt/:id', auths, approvedAt)
router.put('/rejectAt/:id', auths, rejectAt)

export default router