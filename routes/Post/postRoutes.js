import express from "express"
import { addPost, deleteMultiplePosts, publishedPost, approvedPost, rejectPost, getUnPublishedPost, getPublishedPost, deletePost, deletePosts, updatePost, countUnPublishedPost, countPublishedPost, editPostById, viewPostById } from '../../controllers/Post/postController.js'
import { auth } from '../../middleware/authMiddleware.js'
import { upload } from '../../middleware/multerConfig.js'

const router = express.Router()

router.post('/addPost', auth, upload.single('image'), addPost)
router.get('/getUnPublishedPost', auth, getUnPublishedPost)
router.get('/getPublishedPost', auth, getPublishedPost)
router.delete('/deletePost/:id', auth, deletePost)
router.delete('/deleteMultiplePost', auth, deleteMultiplePosts)
router.put('/deletePosts/:id', auth, deletePosts)
router.put('/updatePost/:id', auth, upload.single('image'), updatePost)
router.put('/approvedPost/:id', auth, approvedPost)
router.put('/publishedPost/:id', auth, publishedPost)
router.put('/rejectPost/:id', auth, rejectPost)
router.get('/countUnPublishedPost', auth, countUnPublishedPost)
router.get('/countPublishedPost', auth, countPublishedPost)
router.get('/editPostById/:id', auth, editPostById)
router.get('/viewPostById/:id', auth, viewPostById)

export default router
