import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import BaseController from './base.controller';

class AuthController extends BaseController {

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.signup(req.body);
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.refreshToken(req.body);
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new AuthController();
