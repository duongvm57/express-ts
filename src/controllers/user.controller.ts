import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import BaseController from './base.controller';

class UserController extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getAll();
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.get(req.params);
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.profile(req.params);
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new UserController();