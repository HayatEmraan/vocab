import appError from '@app/errors/appError';
import { userHistoryModel, vocabHistoryModel } from './history.schema';
import {
  historyTypes,
  lessonHistoryTypes,
  vocabHistoryTypes,
} from './history.types';
import httpStatus from 'http-status';
import vocabModel from '../vocabulary/vacab.schema';
import lessonModel from '../lesson/lesson.schema';

const insertHistory = async (payload: historyTypes) => {
  return await userHistoryModel.create(payload);
};

const insertVocabHistory = async (payload: vocabHistoryTypes) => {
  const findVocab = await vocabModel.findById(payload.vocabId);

  if (!findVocab) {
    throw new appError('vocab not found', httpStatus.NOT_FOUND);
  }

  const findHistory = await vocabHistoryModel.findOne({
    userId: payload.userId,
    vocabId: payload.vocabId,
  });

  if (findHistory) {
    throw new appError('vocab already exists', httpStatus.CONFLICT);
  }

  return await userHistoryModel.create(payload);
};

const insertLessonHistory = async (payload: lessonHistoryTypes) => {
  const findLesson = await lessonModel.findById(payload.lessonId);

  if (!findLesson) {
    throw new appError('lesson not found', httpStatus.NOT_FOUND);
  }

  const findHistory = await vocabHistoryModel.findOne({
    userId: payload.userId,
    lessonId: payload.lessonId,
  });

  if (findHistory) {
    throw new appError('lesson already exists', httpStatus.CONFLICT);
  }

  return await userHistoryModel.create(payload);
};

export const historyService = {
  insertHistory,
  insertVocabHistory,
  insertLessonHistory,
};
