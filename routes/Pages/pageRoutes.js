import express from "express"
import { addPages, getPages, deletePage, deletePages, updatePages, countPages, editPageById } from '../../controllers/Pages/pageController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addPages', auth, addPages)
router.get('/getPages', auth, getPages)
router.delete('/deletePage/:id', auth, deletePage)
router.put('/deletePages/:id', auth, deletePages)
router.put('/updatePages/:id', auth, updatePages)
router.get('/countPages', auth, countPages)
router.get('/editPagesById/:id', auth, editPageById)

export default router
