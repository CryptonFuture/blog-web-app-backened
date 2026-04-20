import express from "express"
import { createNotification, getNotify, getNotifyById, deleteNotification, markAsRead } from '../../controllers/Notifications/notifyController.js'

const router = express.Router()

router.post('/addNotification', createNotification)
router.get('/getNotification', getNotify)
router.get('/getNotificationById/:userId', getNotifyById)
router.delete('/deleteNotification/:id', deleteNotification)
router.patch('/markAsRead/:id/read', markAsRead)


export default router
