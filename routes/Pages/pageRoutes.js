import express from "express"
import { addPages, getPages, deletePage, deletePages, updatePages, countPages, editPageById } from '../../controllers/Pages/pageController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addPages', addPages)
router.get('/getPages', auth, getPages)
router.delete('/deletePage/:id', deletePage)
router.put('/deletePages/:id', deletePages)
router.put('/updatePages/:id', updatePages)
router.get('/countPages', countPages)
router.get('/editPagesById/:id', editPageById)

export default router
