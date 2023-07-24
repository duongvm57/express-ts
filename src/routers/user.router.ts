import express from 'express';
import userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.get);

export default userRouter;
