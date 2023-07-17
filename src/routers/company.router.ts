import express from 'express';
import CompanyController from '../controllers/company.controller';

const companyRouter = express.Router();

companyRouter.get('/', CompanyController.getAll);
companyRouter.get('/:companyId', CompanyController.get);

export default companyRouter;
