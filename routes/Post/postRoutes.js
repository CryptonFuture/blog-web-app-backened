import express from "express"
import { addPost, getPost, deletePost, deletePosts, updatePost, countPost, editPostById, viewPostById } from '../../controllers/Post/postController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addPost', auth, addPost)
router.get('/getPost', auth, getPost)
router.delete('/deletePost/:id', auth, deletePost)
router.put('/deletePosts/:id', auth, deletePosts)
router.put('/updatePost/:id', auth, updatePost)
router.get('/countPost', auth, countPost)
router.get('/editPostById/:id', auth, editPostById)
router.get('/viewPostById/:id', auth, viewPostById)

export default router
