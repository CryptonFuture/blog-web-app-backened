import express from "express"
import { getActiveUser, getInActiveUser, getUserInActive, getAllUser, getInActive, deleteUser, changePassword, editProfileById, deleteUserProfile, updateUserProfile, viewProfileById, deleteMultipleUsers, deleteUsers, updateUser, countActiveUser, countInActiveUser,  editUserById, viewUserById } from '../../controllers/User/userController.js'
import { auths } from '../../middleware/authMiddleware.js'
import { upload } from '../../middleware/multerConfig.js'

const router = express.Router()

router.get('/getActiveUser', auths, getActiveUser)
router.get('/getInActiveUser', auths, getInActiveUser)
router.get('/getAllUser', auths, getAllUser)
router.get('/getInActive', auths, getInActive)
router.get('/getUserInActive', auths, getUserInActive)
router.delete('/deleteUser/:id', auths, deleteUser)
router.delete('/deleteUserProfile/:id', auths, deleteUserProfile)
router.put('/deleteUsers/:id', auths, deleteUsers)
router.put('/updateUser/:id', auths, upload.single('image'), updateUser)
router.put('/updateUserProfile/:id', auths, updateUserProfile)
router.put('/changePassword/:id', auths, changePassword)
router.get('/countActiveUser', auths, countActiveUser)
router.get('/countInActiveUser', auths, countInActiveUser)
router.get('/editUserById/:id', auths, editUserById)
router.get('/viewUserById/:id', auths, viewUserById)
router.get('/viewProfileById/:id', auths, viewProfileById)
router.get('/editProfileById/:id', auths, editProfileById)

router.delete('/deleteMultipleUsers', auths, deleteMultipleUsers)

export default router
