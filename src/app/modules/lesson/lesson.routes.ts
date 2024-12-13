import { validate } from '@app/middlewares/validation';
import { Router } from 'express';
import { lessonUpdateValidate, lessonValidate } from './lesson.validation';
import { lessonController } from './lesson.controller';
import { auth } from '@app/middlewares/auth';
import { userRole } from '../user/user.constant';
import { upload } from '@app/utils/uploadImage';
import parseLesson from './lesson.utils';

const lessonRoutes = Router();

lessonRoutes.post(
  '/create-lesson',
  upload.single('image'),
  parseLesson,
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

lessonRoutes.post(
  '/lesson-complete/:id',
  auth(userRole.user),
  lessonController.completeLesson
);

lessonRoutes.get('/stats', auth(userRole.admin), lessonController.getStats);

export default lessonRoutes;
