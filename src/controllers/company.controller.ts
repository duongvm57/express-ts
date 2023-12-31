import { Request, Response, NextFunction } from 'express';
import companyService from '../services/company.service';
import BaseController from './base.controller';

class CompanyController extends BaseController {

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await companyService.getAll();
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await companyService.get({ params: req.params, query: req.query });
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await companyService.create(req.body);
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await companyService.update({ params: req.params, body: req.body });
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new CompanyController();