import { validate } from '@app/middlewares/validation';
import { Router } from 'express';
import { vocabUpdateValidate, vocabValidate } from './vocab.validation';
import { vocabController } from './vacab.controller';

const vocabRoutes = Router();

vocabRoutes.post(
  '/create-vocab',
  validate(vocabValidate),
  vocabController.createVocab
);

vocabRoutes.get('/all-vocab', vocabController.getAllVocab);

vocabRoutes.get('/single-vocab/:id', vocabController.getSingleVocab);

vocabRoutes.patch(
  '/update-vocab/:id',
  validate(vocabUpdateValidate),
  vocabController.updateVocab
);

export default vocabRoutes;
