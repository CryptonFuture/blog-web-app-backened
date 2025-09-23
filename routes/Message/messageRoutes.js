import express from 'express';

const router = express.Router()

import { getMessages, createMessage } from '../../controllers/Message/messageController.js';

router.get('/getMessages', getMessages);
router.post('/createMessage', createMessage);

export default router

