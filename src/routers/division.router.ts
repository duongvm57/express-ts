import express from 'express';
import divisionController from '../controllers/division.controller';

const divisionRouter = express.Router();

divisionRouter.get('/', divisionController.getAll);
divisionRouter.get('/:divisionId', divisionController.get);
divisionRouter.post('/', divisionController.create);
divisionRouter.put('/:divisionId', divisionController.update);

export default divisionRouter;