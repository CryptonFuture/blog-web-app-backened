import express from 'express'
import {AddContactUs, getContactUs, viewContactUsById, getContactUsById, deleteContact, deleteContactUs, UpdateContactUs, countContactUs} from '../../controllers/contactUs/contactUsController.js'
import { auths } from '../../middleware/authMiddleware.js'

const router = express()

router.post('/contactUs', auths, AddContactUs)
router.get('/getContactUs', auths, getContactUs)
router.get('/getContactUsById/:id', auths, getContactUsById)
router.get('/viewContactUsById/:id', auths, viewContactUsById),
router.delete('/deleteContactUs/:id', auths, deleteContactUs)
router.put('/updateContactUs/:id', auths, UpdateContactUs)
router.get('/countContactUs', auths, countContactUs)
router.put('/deleteContact/:id', auths, deleteContact)

export default router