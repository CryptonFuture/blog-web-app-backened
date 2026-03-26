import express from "express"
import { addTag, deleteMultipleTags, getTag, deleteTag, deleteTags, updateTag, countTag, editTagById, viewTagById } from '../../controllers/Tag/tagController.js'
import { auths } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addTag', auths, addTag)
router.get('/getTag', auths, getTag)
router.delete('/deleteTag/:id', auths, deleteTag)
router.put('/deleteTags/:id', auths, deleteTags)
router.put('/updateTag/:id', auths, updateTag)
router.get('/countTag', auths, countTag)
router.get('/editTagById/:id', auths, editTagById)
router.get('/viewTagById/:id', auths, viewTagById)
router.delete('/deleteMultipleTags', auths, deleteMultipleTags)

export default router
