import express from 'express';

const router = express.Router()

import { getModule, getModules } from '../../controllers/Module/moduleController.js';

router.get('/getModule', getModule);
router.get('/getModules', getModules);

export default router

