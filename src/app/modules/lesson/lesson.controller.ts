/* eslint-disable @typescript-eslint/no-explicit-any */
import { catchAsync } from '@app/utils/catchAsync';
import globalReturn from '@app/utils/globalReturn';
import { RequestHandler } from 'express';
import { lessonService } from './lesson.service';
import { lessonTypes } from './lesson.types';
import httpStatus from 'http-status';

const createLesson: RequestHandler = async (req, res) => {
  const { _id } = req.user;
  const data = await lessonService.insertLesson({
    ...req.body,
    adminId: _id,
    updatedId: _id,
  });

  globalReturn<lessonTypes>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'lesson created successfully',
    data,
  });
};

const getAllLessons: RequestHandler = async (req, res) => {
  const data = await lessonService.getAllLessons();
  globalReturn<lessonTypes[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'lessons fetched successfully',
    data,
  });
};

const getSingleLesson: RequestHandler = async (req, res) => {
  const data = await lessonService.getSingleLesson(req.params.id);
  globalReturn<lessonTypes | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'lesson fetched successfully',
    data,
  });
};

const updateLesson: RequestHandler = async (req, res) => {
  const { _id } = req.user;
  const data = await lessonService.updateLesson(req.params.id, {
    ...req.body,
    updatedId: _id,
  });
  globalReturn<lessonTypes | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'lesson updated successfully',
    data,
  });
};

const getStats: RequestHandler = async (req, res) => {
  const data = await lessonService.getStats();
  globalReturn<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'lesson updated successfully',
    data,
  });
};

const completeLesson: RequestHandler = async (req, res) => {
  const { _id } = req.user;
  const data = await lessonService.completeLesson(req.params.id, _id);
  globalReturn<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'lesson updated successfully',
    data,
  });
};

export const lessonController = {
  createLesson: catchAsync(createLesson),
  getAllLessons: catchAsync(getAllLessons),
  getSingleLesson: catchAsync(getSingleLesson),
  updateLesson: catchAsync(updateLesson),
  getStats: catchAsync(getStats),
  completeLesson: catchAsync(completeLesson),
};
