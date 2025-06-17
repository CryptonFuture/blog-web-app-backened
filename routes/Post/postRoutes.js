import express from "express"
import { addPost, getPost, deletePost, deletePosts, updatePost, countPost, editPostById } from '../../controllers/Post/postController.js'

const router = express.Router()

router.post('/addPost', addPost)
router.get('/getPost', getPost)
router.delete('/deletePost/:id', deletePost)
router.put('/deletePosts/:id', deletePosts)
router.put('/updatePost/:id', updatePost)
router.get('/countPost', countPost)
router.get('/editPostById/:id', editPostById)

export default router
