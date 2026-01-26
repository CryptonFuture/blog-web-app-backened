import express from "express"
import { addTag, deleteMultipleTags, getTag, deleteTag, deleteTags, updateTag, countTag, editTagById, viewTagById } from '../../controllers/Tag/tagController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addTag', addTag)
router.get('/getTag', getTag)
router.delete('/deleteTag/:id', deleteTag)
router.put('/deleteTags/:id', deleteTags)
router.put('/updateTag/:id', updateTag)
router.get('/countTag', countTag)
router.get('/editTagById/:id', editTagById)
router.get('/viewTagById/:id', viewTagById)
router.delete('/deleteMultipleTags', deleteMultipleTags)

export default router
