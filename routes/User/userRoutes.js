import express from "express"
import { getUser, deleteUser, changePassword, editProfileById, deleteUserProfile, updateUserProfile, viewProfileById, deleteMultipleUsers, deleteUsers, updateUser, countUser, editUserById, viewUserById } from '../../controllers/User/userController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getUser', auth, getUser)
router.delete('/deleteUser/:id', auth, deleteUser)
router.delete('/deleteUserProfile/:id', auth, deleteUserProfile)
router.put('/deleteUsers/:id', auth, deleteUsers)
router.put('/updateUser/:id', auth, updateUser)
router.put('/updateUserProfile/:id', auth, updateUserProfile)
router.put('/changePassword/:id', auth, changePassword)
router.get('/countUser', auth, countUser)
router.get('/editUserById/:id', auth, editUserById)
router.get('/viewUserById/:id', auth, viewUserById)
router.get('/viewProfileById/:id', auth, viewProfileById)
router.get('/editProfileById/:id', auth, editProfileById)

router.delete('/deleteMultipleUsers', auth, deleteMultipleUsers)

export default router
