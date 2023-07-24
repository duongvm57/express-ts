import express from 'express';
import companyController from '../controllers/company.controller';

const companyRouter = express.Router();

companyRouter.get('/', companyController.getAll);
companyRouter.get('/:companyId', companyController.get);

export default companyRouter;
