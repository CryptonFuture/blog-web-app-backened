import express from "express"
import { addPost, getAllPost, deleteMultiplePosts, editUnPublishedPostById, fetchPublishedPost, publishedPost, approvedPost, rejectPost, getUnPublishedPost, getPublishedPost, deletePost, deletePosts, updatePost, countUnPublishedPost, countPublishedPost, editPostById, viewPostById } from '../../controllers/Post/postController.js'
import { auths } from '../../middleware/authMiddleware.js'
import { upload } from '../../middleware/multerConfig.js'

const router = express.Router()

router.post('/addPost', auths, upload.single('image'), addPost)
router.get('/getUnPublishedPost', auths, getUnPublishedPost)
router.get('/getAllPost', auths, getAllPost)
router.get('/getPublishedPost', auths, getPublishedPost)
router.get('/fetchPublishedPost', fetchPublishedPost)
router.delete('/deletePost/:id', auths, deletePost)
router.delete('/deleteMultiplePost', auths, deleteMultiplePosts)
router.put('/deletePosts/:id', auths, deletePosts)
router.put('/updatePost/:id', auths, upload.single('image'), updatePost)
router.put('/approvedPost/:id', auths, approvedPost)
router.put('/publishedPost/:id', auths, publishedPost)
router.put('/rejectPost/:id', auths, rejectPost)
router.get('/countUnPublishedPost', auths, countUnPublishedPost)
router.get('/countPublishedPost', auths, countPublishedPost)
router.get('/editPostById/:id', auths, editPostById)
router.get('/editUnPublishedPostById/:id', auths, editUnPublishedPostById)
router.get('/viewPostById/:id', auths, viewPostById)

export default router
