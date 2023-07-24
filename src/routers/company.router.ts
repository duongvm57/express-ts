import express from 'express';
import companyController from '../controllers/company.controller';

const companyRouter = express.Router();

companyRouter.get('/', companyController.getAll);
companyRouter.get('/:companyId', companyController.get);
companyRouter.post('/', companyController.create);
companyRouter.put('/:companyId', companyController.update);

export default companyRouter;
