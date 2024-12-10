import { catchAsync } from '@app/utils/catchAsync';
import globalReturn from '@app/utils/globalReturn';
import { RequestHandler } from 'express';
import { lessonService } from './lesson.service';
import { lessonTypes } from './lesson.types';
import httpStatus from 'http-status';

const createLesson: RequestHandler = async (req, res) => {
  const data = await lessonService.insertLesson(req.body);

  globalReturn<lessonTypes>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Lesson created successfully',
    data,
  });
};

const getAllLessons: RequestHandler = async (req, res) => {
  const data = await lessonService.getAllLessons();
  globalReturn<lessonTypes[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Lessons fetched successfully',
    data,
  });
};

const getSingleLesson: RequestHandler = async (req, res) => {
  const data = await lessonService.getSingleLesson(req.params.id);
  globalReturn<lessonTypes | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Lesson fetched successfully',
    data,
  });
};

const updateLesson: RequestHandler = async (req, res) => {
  const data = await lessonService.updateLesson(req.params.id, req.body);
  globalReturn<lessonTypes | null>(res, {
    statusCode: 200,
    success: true,
    message: 'Lesson updated successfully',
    data,
  });
};

export const lessonController = {
  createLesson: catchAsync(createLesson),
  getAllLessons: catchAsync(getAllLessons),
  getSingleLesson: catchAsync(getSingleLesson),
  updateLesson: catchAsync(updateLesson),
};
