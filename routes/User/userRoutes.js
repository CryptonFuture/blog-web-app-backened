import express from "express"
import { getActiveUser, getInActiveUser, getInActive, deleteUser, changePassword, editProfileById, deleteUserProfile, updateUserProfile, viewProfileById, deleteMultipleUsers, deleteUsers, updateUser, countActiveUser, countInActiveUser,  editUserById, viewUserById } from '../../controllers/User/userController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/getActiveUser', auth, getActiveUser)
router.get('/getInActiveUser', auth, getInActiveUser)
router.get('/getInActive', getInActive)
router.delete('/deleteUser/:id', auth, deleteUser)
router.delete('/deleteUserProfile/:id', auth, deleteUserProfile)
router.put('/deleteUsers/:id', auth, deleteUsers)
router.put('/updateUser/:id', auth, updateUser)
router.put('/updateUserProfile/:id', auth, updateUserProfile)
router.put('/changePassword/:id', auth, changePassword)
router.get('/countActiveUser', auth, countActiveUser)
router.get('/countInActiveUser', auth, countInActiveUser)
router.get('/editUserById/:id', auth, editUserById)
router.get('/viewUserById/:id', auth, viewUserById)
router.get('/viewProfileById/:id', auth, viewProfileById)
router.get('/editProfileById/:id', auth, editProfileById)

router.delete('/deleteMultipleUsers', auth, deleteMultipleUsers)

export default router
