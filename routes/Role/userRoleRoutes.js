import express from "express"

import { assignRole,  getUserRoles, assignNewRole} from '../../controllers/Role/userRoleController.js'

import { auths } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/assign', auths, assignRole)
router.post('/assignNewRole', auths, assignNewRole)
router.get('/getUserRoles', auths, getUserRoles);


export default router
