import express from "express"
import { addPages, deleteMultiplePages, getPages, deletePage, deletePages, updatePages, countPages, editPageById, viewPagesById } from '../../controllers/Pages/pageController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addPages', auth, addPages)
router.get('/getPages', auth, getPages)
router.delete('/deletePage/:id', auth, deletePage)
router.put('/deletePages/:id', auth, deletePages)
router.put('/updatePages/:id', auth, updatePages)
router.get('/countPages', auth, countPages)
router.get('/editPagesById/:id', auth, editPageById)
router.get('/viewPagesById/:id', auth, viewPagesById)
router.delete('/deleteMultiplePages', auth, deleteMultiplePages)

export default router
