import express from 'express';
import authController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/register', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/refreshtoken', authController.refreshToken);

export default authRouter;
