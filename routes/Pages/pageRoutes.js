import express from "express"
import { addPages, deleteMultiplePages, getPage, getPages, deletePage, deletePages, updatePages, countPages, editPageById, viewPagesById } from '../../controllers/Pages/pageController.js'
import { auths } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addPages', auths, addPages)
router.get('/getPages', auths, getPages)
router.get('/getPage', auths, getPage)
router.delete('/deletePage/:id', auths, deletePage)
router.put('/deletePages/:id', auths, deletePages)
router.put('/updatePages/:id', auths, updatePages)
router.get('/countPages', auths, countPages)
router.get('/editPagesById/:id', auths, editPageById)
router.get('/viewPagesById/:id', auths, viewPagesById)
router.delete('/deleteMultiplePages', auths, deleteMultiplePages)

export default router
