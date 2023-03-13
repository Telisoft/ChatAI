import { Router } from 'express';
import completion from './completion.js';
import user from './user.js';

const router = Router();

router.use('/completion', completion);
router.use('/user', user);

export default router;