import express from "express"
import { getPermission, AddPermission, createOnBoardings, getOnBoardingUser, createOnBoarding, updatePermission, permissionCount, editPermissionById, viewPermissionById, deletePermission, deletePermissions } from '../../controllers/Permission/permissionController.js'
import { auths } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addPermission', AddPermission)
router.get('/getPermission',  getPermission)
router.get('/permissionCount', permissionCount)
router.put('/updatePermission/:id', updatePermission)
router.get('/editPermissionById/:id', editPermissionById)
router.get('/viewPermissionById/:id', viewPermissionById)
router.delete('/deletePermission/:id', deletePermission)
router.put('/deletePermissions/:id', deletePermissions)
router.post('/create-with-permissions', createOnBoarding)
router.post('/createOnBoardings', auths, createOnBoardings)
router.get('/getOnBoardingUser', auths, getOnBoardingUser)

export default router
