import { auth } from '@app/middlewares/auth';
import { Router } from 'express';
import { userRole } from '../user/user.constant';
import { tutorialController } from './tutorial.controller';

const tutorialRoutes = Router();

tutorialRoutes.post(
  '/create-tutorial',
  auth(userRole.admin),
  tutorialController.createTutorial
);

tutorialRoutes.get(
  '/all-tutorial',
  auth(userRole.admin),
  tutorialController.getAllTutorials
);

tutorialRoutes.get(
  '/single-tutorial/:id',
  auth(userRole.admin),
  tutorialController.getSingleTutorial
);

tutorialRoutes.patch(
  '/update-tutorial/:id',
  auth(userRole.admin),
  tutorialController.updateTutorial
);

export default tutorialRoutes;
