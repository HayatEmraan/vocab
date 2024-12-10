import appError from '@app/errors/appError';
import lessonModel from './lesson.schema';
import { lessonTypes } from './lesson.types';
import httpStatus from 'http-status';

const insertLesson = async (payload: lessonTypes) => {
  return await lessonModel.create(payload);
};

const getAllLessons = async () => {
  return await lessonModel.find();
};

const getSingleLesson = async (id: string) => {
  const findLesson = await lessonModel.findById(id);

  if (!findLesson) {
    throw new appError('Lesson not found', httpStatus.NOT_FOUND);
  }

  return await lessonModel.findById(id);
};

const updateLesson = async (id: string, payload: Partial<lessonTypes>) => {
  const findLesson = await lessonModel.findById(id);

  if (!findLesson) {
    throw new appError('Lesson not found', httpStatus.NOT_FOUND);
  }
  return await lessonModel.findByIdAndUpdate(id, payload, { new: true });
};

export const lessonService = {
  insertLesson,
  getAllLessons,
  getSingleLesson,
  updateLesson,
};
