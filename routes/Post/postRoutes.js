import express from "express"
import { addPost, getAllPost, deleteMultiplePosts, editUnPublishedPostById, fetchPublishedPost, publishedPost, approvedPost, rejectPost, getUnPublishedPost, getPublishedPost, deletePost, deletePosts, updatePost, countUnPublishedPost, countPublishedPost, editPostById, viewPostById } from '../../controllers/Post/postController.js'
import { auth } from '../../middleware/authMiddleware.js'
import { upload } from '../../middleware/multerConfig.js'

const router = express.Router()

router.post('/addPost', upload.single('image'), addPost)
router.get('/getUnPublishedPost', getUnPublishedPost)
router.get('/getAllPost', getAllPost)
router.get('/getPublishedPost', getPublishedPost)
router.get('/fetchPublishedPost', fetchPublishedPost)
router.delete('/deletePost/:id', deletePost)
router.delete('/deleteMultiplePost', deleteMultiplePosts)
router.put('/deletePosts/:id', deletePosts)
router.put('/updatePost/:id', upload.single('image'), updatePost)
router.put('/approvedPost/:id', approvedPost)
router.put('/publishedPost/:id', publishedPost)
router.put('/rejectPost/:id', rejectPost)
router.get('/countUnPublishedPost', countUnPublishedPost)
router.get('/countPublishedPost', countPublishedPost)
router.get('/editPostById/:id', editPostById)
router.get('/editUnPublishedPostById/:id', editUnPublishedPostById)
router.get('/viewPostById/:id', viewPostById)

export default router
