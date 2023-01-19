import { Router } from 'express';
import completion from './completion.js';

const router = Router();

router.use('/completion', completion);

export default router;