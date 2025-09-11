import express from 'express'
import {AddContactUs, getContactUs, getContactUsById, deleteContact, deleteContactUs, UpdateContactUs, countContactUs} from '../../controllers/contactUs/contactUsController.js'

const router = express()

router.post('/contactUs', AddContactUs)
router.get('/getContactUs', getContactUs)
router.get('/getContactUsById/:id', getContactUsById)
router.delete('/deleteContactUs/:id', deleteContactUs)
router.put('/updateContactUs/:id', UpdateContactUs)
router.get('/countContactUs', countContactUs)
router.put('/deleteContact/:id', deleteContact)

export default router