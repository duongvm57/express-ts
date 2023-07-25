import express from 'express';
import divisionController from '../controllers/division.controller';
import { checkAdminRole } from '../middleware/permission.middleware';

const divisionRouter = express.Router();

divisionRouter.get('/', divisionController.getAll);
divisionRouter.get('/:divisionId', divisionController.get);
divisionRouter.post('/', checkAdminRole, divisionController.create);
divisionRouter.put('/:divisionId', checkAdminRole, divisionController.update);
divisionRouter.delete('/:divisionId', checkAdminRole, divisionController.delete);

export default divisionRouter;