import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import BaseController from './base.controller';

class UserController extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.getAll();
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.get(req.params);
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new UserController();