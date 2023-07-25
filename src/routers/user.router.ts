import express from 'express';
import userController from '../controllers/user.controller';
import { checkAdminRole, checkProfileAccess } from '../middleware/permission.middleware';

const userRouter = express.Router();

userRouter.get('/', checkAdminRole, userController.getAll);
userRouter.get('/:userId', checkProfileAccess, userController.get);
userRouter.put('/:userId', checkProfileAccess, userController.update);
userRouter.delete('/:userId', checkProfileAccess, userController.delete);

export default userRouter;
