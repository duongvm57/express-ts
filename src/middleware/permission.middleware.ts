import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';

const checkAdminRole = async(req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.user;
  const role = await userService.getRoleByUserId(currentUser.id);
  if (role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden: Access denied.' });
  }
  next();
};

const checkSuperAdminRole = async(req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.user;
  const role = await userService.getRoleByUserId(currentUser.id);
  if (role !== 'SUPERADMIN') {
    return res.status(403).json({ message: 'Forbidden: Access denied.' });
  }
  next();
};

const checkProfileAccess = async(req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.user;
  const role = await userService.getRoleByUserId(currentUser.id);
  if (role === 'USER' && currentUser?.id != req.params?.userId) {
    return res.status(403).json({ message: 'Forbidden: Access denied.' });
  }
  next();
};

export { checkAdminRole, checkSuperAdminRole, checkProfileAccess };