import { Request, Response, NextFunction } from 'express';
import BaseController from './base.controller';
import branchService from '../services/branch.service';

class BranchController extends BaseController {

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await branchService.getAll();
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await branchService.get({ params: req.params, query: req.query });
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await branchService.create(req.body, req.user);
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await branchService.update({ params: req.params, body: req.body });
      super.jsonResponse(res, 200, result);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new BranchController();