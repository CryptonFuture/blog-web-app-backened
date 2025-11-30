import express from "express"
import { addQrCodePost, getQrCodePost, getQrCodePostById, updateQrCodePost, deleteQrCodePost } from '../../controllers/QrCode/qrCodeController.js'

const router = express.Router()

router.post('/addQrCodePost', addQrCodePost)
router.get('/getQrCodePost', getQrCodePost)
router.get('/getQrCodePostById/:id', getQrCodePostById)
router.put('/updateQrCodePost/:id', updateQrCodePost)
router.delete('/deleteQrCodePost/:id', deleteQrCodePost)

export default router
