import express from "express"
import { createCategories, getCategory, updateCategory, getCategoryById, deleteCategory, countCategory } from '../../controllers/Category/categoryController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addCategory', createCategories)
router.get('/getCategory', getCategory)
router.get('/countCategory', countCategory)
router.get('/getCategoryById/:id', getCategoryById)
router.delete('/deleteCategory/:id', deleteCategory)
router.put('/updateCategory/:id', updateCategory)

export default router