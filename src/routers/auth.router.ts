import express from 'express';
import authController from '../controllers/auth.controller';
import { uploadImage } from '../utils/storage';

const authRouter = express.Router();

authRouter.post('/register', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/refreshtoken', authController.refreshToken);
authRouter.post('/upload', uploadImage.single('photos'), function (req, res) {
  console.log(req?.file);

  // @ts-ignore
  res.send('Successfully uploaded ' + req.file.key + ' files!');
});

export default authRouter;
