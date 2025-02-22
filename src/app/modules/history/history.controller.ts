import { catchAsync } from '@app/utils/catchAsync';
import globalReturn from '@app/utils/globalReturn';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { historyService } from './history.service';
import { historyTypes } from './history.types';

const createHistory: RequestHandler = async (req, res) => {
  const data = await historyService.insertHistory(req.body);
  globalReturn<historyTypes>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'History created successfully',
    data,
  });
};

const createVocabHistory: RequestHandler = async (req, res) => {
  const data = await historyService.insertVocabHistory(req.body);
  globalReturn<historyTypes>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'History created successfully',
    data,
  });
};

const createLessonHistory: RequestHandler = async (req, res) => {
  const data = await historyService.insertLessonHistory(req.body);
  globalReturn<historyTypes>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'History created successfully',
    data,
  });
};

export const historyController = {
  createHistory: catchAsync(createHistory),
  createVocabHistory: catchAsync(createVocabHistory),
  createLessonHistory: catchAsync(createLessonHistory),
};
