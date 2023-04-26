import { Router } from 'express';
import completion from './completion.js';
import user from './user.js';
import admin from './admin.js';

const router = Router();

router.use('/completion', completion);
router.use('/user', user);
router.use('/admin', admin);

export default router;