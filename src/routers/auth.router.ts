import express from 'express';

import AuthController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/register', AuthController.signup);
authRouter.post('/login', AuthController.login);
authRouter.post('/refreshtoken', AuthController.refreshToken);

export default authRouter;
