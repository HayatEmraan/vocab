import { validate } from '@app/middlewares/validation';
import { Router } from 'express';
import { lessonUpdateValidate, lessonValidate } from './lesson.validation';
import { lessonController } from './lesson.controller';

const lessonRoutes = Router();

lessonRoutes.post(
  '/create-lesson',
  validate(lessonValidate),
  lessonController.createLesson
);

lessonRoutes.get('/all-lessons', lessonController.getAllLessons);

lessonRoutes.get('/single-lesson/:id', lessonController.getSingleLesson);

lessonRoutes.patch(
  '/update-lesson/:id',
  validate(lessonUpdateValidate),
  lessonController.updateLesson
);

export default lessonRoutes;
