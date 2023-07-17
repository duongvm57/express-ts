import express from 'express';
import UserController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/:userId', UserController.get);

export default userRouter;
