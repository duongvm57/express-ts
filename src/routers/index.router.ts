import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import authRouter from './auth.router';
import userRouter from './user.router';
import companyRouter from './company.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', authenticateToken, userRouter);
router.use('/companies', authenticateToken, companyRouter);

export { router as default };