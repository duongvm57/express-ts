import { Request, Response, NextFunction } from 'express';
import CompanyService from '../services/company.service';
import BaseController from './base.controller';

class CompanyController extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CompanyService.getAll();
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CompanyService.get({ params: req.params, query: req.query });
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new CompanyController();