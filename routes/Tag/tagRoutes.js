import express from "express"
import { addTag, getTag, deleteTag, deleteTags, updateTag, countTag, editTagById } from '../../controllers/Tag/tagController.js'

const router = express.Router()

router.post('/addTag', addTag)
router.get('/getTag', getTag)
router.delete('/deleteTag/:id', deleteTag)
router.put('/deleteTags/:id', deleteTags)
router.put('/updateTag/:id', updateTag)
router.get('/countTag', countTag)
router.get('/editTagById/:id', editTagById)

export default router
