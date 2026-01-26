import express from "express"
import { addPages, deleteMultiplePages, getPage, getPages, deletePage, deletePages, updatePages, countPages, editPageById, viewPagesById } from '../../controllers/Pages/pageController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addPages', addPages)
router.get('/getPages', getPages)
router.get('/getPage', getPage)
router.delete('/deletePage/:id', deletePage)
router.put('/deletePages/:id', deletePages)
router.put('/updatePages/:id', updatePages)
router.get('/countPages', countPages)
router.get('/editPagesById/:id', editPageById)
router.get('/viewPagesById/:id', viewPagesById)
router.delete('/deleteMultiplePages', deleteMultiplePages)

export default router
