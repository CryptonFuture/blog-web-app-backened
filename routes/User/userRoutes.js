import express from "express"
import { getUser, deleteUser, deleteUsers, updateUser, countUser, editUserById, viewUserById } from '../../controllers/User/userController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getUser', auth, getUser)
router.delete('/deleteUser/:id', auth, deleteUser)
router.put('/deleteUsers/:id', auth, deleteUsers)
router.put('/updateUser/:id', auth, updateUser)
router.get('/countUser', auth, countUser)
router.get('/editUserById/:id', auth, editUserById)
router.get('/viewUserById/:id', auth, viewUserById)

export default router
