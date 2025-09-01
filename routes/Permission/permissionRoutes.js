import express from "express"
import { getPermission, AddPermission, updatePermission, permissionCount, editPermissionById, viewPermissionById, deletePermission, deletePermissions } from '../../controllers/Permission/permissionController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addPermission', auth, AddPermission)
router.get('/getPermission', auth, getPermission)
router.get('/permissionCount', auth, permissionCount)
router.put('/updatePermission/:id', auth, updatePermission)
router.get('/editPermissionById/:id', auth, editPermissionById)
router.get('/viewPermissionById/:id', auth, viewPermissionById)
router.delete('/deletePermission/:id', auth, deletePermission)
router.put('/deletePermissions/:id', auth, deletePermissions)

export default router
