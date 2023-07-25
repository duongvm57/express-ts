import { Request, Response, NextFunction } from 'express';
import BaseController from './base.controller';
import divisionService from '../services/division.service';

class DivisionController extends BaseController {

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await divisionService.getAll();
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await divisionService.get({ params: req.params, query: req.query });
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await divisionService.create(req.body);
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await divisionService.update({ params: req.params, body: req.body });
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await divisionService.delete(req.params);
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new DivisionController();