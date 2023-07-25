import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { checkSuperAdminRole, checkAdminRole } from '../middleware/permission.middleware';
import authRouter from './auth.router';
import userRouter from './user.router';
import companyRouter from './company.router';
import branchRouter from './branch.router';
import divisionRouter from './division.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', authenticateToken, userRouter);
router.use('/companies', authenticateToken, checkSuperAdminRole, companyRouter);
router.use('/branchs', authenticateToken, checkAdminRole, branchRouter);
router.use('/divisions', authenticateToken, divisionRouter);

export { router as default };