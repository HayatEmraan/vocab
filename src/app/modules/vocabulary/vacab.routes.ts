import { validate } from '@app/middlewares/validation';
import { Router } from 'express';
import { vocabUpdateValidate, vocabValidate } from './vocab.validation';
import { vocabController } from './vacab.controller';
import { auth } from '@app/middlewares/auth';
import { userRole } from '../user/user.constant';

const vocabRoutes = Router();

vocabRoutes.post(
  '/create-vocab',
  auth(userRole.admin),
  validate(vocabValidate),
  vocabController.createVocab
);

vocabRoutes.get(
  '/all-vocab',
  auth(userRole.admin, userRole.user),
  vocabController.getAllVocab
);

vocabRoutes.get(
  '/single-vocab/:id',
  auth(userRole.admin, userRole.user),
  vocabController.getSingleVocab
);

vocabRoutes.patch(
  '/update-vocab/:id',
  auth(userRole.admin),
  validate(vocabUpdateValidate),
  vocabController.updateVocab
);

vocabRoutes.post(
  '/vocab-complete/:id',
  auth(userRole.user),
  vocabController.completeVocab
);

vocabRoutes.get('/stats', auth(userRole.admin), vocabController.getStats);

export default vocabRoutes;
