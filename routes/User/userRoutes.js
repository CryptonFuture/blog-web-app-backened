import express from "express"
import { getUser, deleteUser, deleteUsers, updateUser, countUser, editUserById } from '../../controllers/User/userController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getUser', auth, getUser)
router.delete('/deleteUser/:id', auth, deleteUser)
router.put('/deleteUsers/:id', deleteUsers)
router.put('/updateUser/:id', auth, updateUser)
router.get('/countUser', countUser)
router.get('/editUserById/:id', auth, editUserById)

export default router
