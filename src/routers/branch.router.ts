import express from 'express';
import branchController from '../controllers/branch.controller';

const branchRouter = express.Router();

branchRouter.get('/', branchController.getAll);
branchRouter.get('/:branchId', branchController.get);
branchRouter.post('/', branchController.create);
branchRouter.put('/:branchId', branchController.update);
branchRouter.delete('/:branchId', branchController.delete);

export default branchRouter;