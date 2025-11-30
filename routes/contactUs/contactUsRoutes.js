import express from 'express'
import {AddContactUs, getContactUs, viewContactUsById, getContactUsById, deleteContact, deleteContactUs, UpdateContactUs, countContactUs} from '../../controllers/contactUs/contactUsController.js'
import { auth } from '../../middleware/authMiddleware.js'

const router = express()

router.post('/contactUs', AddContactUs)
router.get('/getContactUs', getContactUs)
router.get('/getContactUsById/:id', getContactUsById)
router.get('/viewContactUsById/:id', viewContactUsById),
router.delete('/deleteContactUs/:id', deleteContactUs)
router.put('/updateContactUs/:id', UpdateContactUs)
router.get('/countContactUs', countContactUs)
router.put('/deleteContact/:id', deleteContact)

export default router