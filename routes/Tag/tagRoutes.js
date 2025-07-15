import express from "express"
import { addTag, getTag, deleteTag, deleteTags, updateTag, countTag, editTagById } from '../../controllers/Tag/tagController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addTag', auth, addTag)
router.get('/getTag', auth, getTag)
router.delete('/deleteTag/:id', auth, deleteTag)
router.put('/deleteTags/:id', auth, deleteTags)
router.put('/updateTag/:id', auth, updateTag)
router.get('/countTag', auth, countTag)
router.get('/editTagById/:id', auth, editTagById)

export default router
