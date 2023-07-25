import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import BaseController from './base.controller';

class UserController extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getAll(req.user);
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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.update({ params: req.params, body: req.body, currentUser: req.user });
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.delete(req.params);
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new UserController();