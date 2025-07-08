import express from "express"
import { addPost, getPost, deletePost, deletePosts, updatePost, countPost, editPostById } from '../../controllers/Post/postController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addPost', auth, addPost)
router.get('/getPost', auth, getPost)
router.delete('/deletePost/:id', auth, deletePost)
router.put('/deletePosts/:id', deletePosts)
router.put('/updatePost/:id', auth, updatePost)
router.get('/countPost', countPost)
router.get('/editPostById/:id', auth, editPostById)

export default router
