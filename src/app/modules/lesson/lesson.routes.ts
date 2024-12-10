import { validate } from '@app/middlewares/validation';
import { Router } from 'express';
import { lessonUpdateValidate, lessonValidate } from './lesson.validation';
import { lessonController } from './lesson.controller';
import { auth } from '@app/middlewares/auth';
import { userRole } from '../user/user.constant';

const lessonRoutes = Router();

lessonRoutes.post(
  '/create-lesson',
  auth(userRole.admin),
  validate(lessonValidate),
  lessonController.createLesson
);

lessonRoutes.get(
  '/all-lessons',
  auth(userRole.admin, userRole.user),
  lessonController.getAllLessons
);

lessonRoutes.get(
  '/single-lesson/:id',
  auth(userRole.admin, userRole.user),
  lessonController.getSingleLesson
);

lessonRoutes.patch(
  '/update-lesson/:id',
  auth(userRole.admin),
  validate(lessonUpdateValidate),
  lessonController.updateLesson
);

export default lessonRoutes;
