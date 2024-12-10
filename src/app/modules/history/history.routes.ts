import { validate } from '@app/middlewares/validation';
import { Router } from 'express';
import { historyController } from './history.controller';
import { historyValidate } from './history.validation';

const historyRoutes = Router();

historyRoutes.post(
  '/create-history',
  validate(historyValidate),
  historyController.createHistory
);

export default historyRoutes;
