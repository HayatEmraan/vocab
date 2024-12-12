import { validate } from '@app/middlewares/validation';
import { Router } from 'express';
import { historyController } from './history.controller';
import { historyValidate } from './history.validation';
import { auth } from '@app/middlewares/auth';
import { userRole } from '../user/user.constant';

const historyRoutes = Router();

historyRoutes.post(
  '/user-history',
  auth(userRole.admin),
  validate(historyValidate),
  historyController.createHistory
);

historyRoutes.post(
  '/lesson-history',
  auth(userRole.user),
  historyController.createHistory
);

historyRoutes.post(
  '/vocab-history',
  auth(userRole.user),
  historyController.createHistory
);

export default historyRoutes;
