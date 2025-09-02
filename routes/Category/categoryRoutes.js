import express from "express"
import { createCategories, getCategory, updateCategory, getCategoryById, deleteCategory, countCategory } from '../../controllers/Category/categoryController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addCategory', auth, createCategories)
router.get('/getCategory', auth, getCategory)
router.get('/countCategory', auth, countCategory)
router.get('/getCategoryById/:id', auth, getCategoryById)
router.delete('/deleteCategory/:id', auth, deleteCategory)
router.put('/updateCategory/:id', auth, updateCategory)

export default router