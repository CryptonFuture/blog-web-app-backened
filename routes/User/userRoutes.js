import express from "express"
import { getActiveUser, getInActiveUser, getUserInActive, getAllUser, getInActive, deleteUser, changePassword, editProfileById, deleteUserProfile, updateUserProfile, viewProfileById, deleteMultipleUsers, deleteUsers, updateUser, countActiveUser, countInActiveUser,  editUserById, viewUserById } from '../../controllers/User/userController.js'
import { auth } from '../../middleware/authMiddleware.js'
import { upload } from '../../middleware/multerConfig.js'

const router = express.Router()

router.get('/getActiveUser', getActiveUser)
router.get('/getInActiveUser', getInActiveUser)
router.get('/getAllUser', getAllUser)
router.get('/getInActive', getInActive)
router.get('/getUserInActive', getUserInActive)
router.delete('/deleteUser/:id', deleteUser)
router.delete('/deleteUserProfile/:id', deleteUserProfile)
router.put('/deleteUsers/:id', deleteUsers)
router.put('/updateUser/:id', upload.single('image'), updateUser)
router.put('/updateUserProfile/:id', updateUserProfile)
router.put('/changePassword/:id', changePassword)
router.get('/countActiveUser', countActiveUser)
router.get('/countInActiveUser', countInActiveUser)
router.get('/editUserById/:id', editUserById)
router.get('/viewUserById/:id', viewUserById)
router.get('/viewProfileById/:id', viewProfileById)
router.get('/editProfileById/:id', editProfileById)

router.delete('/deleteMultipleUsers', deleteMultipleUsers)

export default router
