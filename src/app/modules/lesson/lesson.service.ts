/* eslint-disable @typescript-eslint/no-explicit-any */
import appError from '@app/errors/appError';
import lessonModel from './lesson.schema';
import { lessonTypes } from './lesson.types';
import httpStatus from 'http-status';
import { lessonHistoryModel } from '../history/history.schema';
import mongoose from 'mongoose';
import { userRole } from '../user/user.constant';
import vocabModel from '../vocabulary/vacab.schema';

const insertLesson = async (payload: lessonTypes) => {
  const { id, ...props } = payload;
  return await lessonModel.findByIdAndUpdate(id, props, {
    new: true,
    upsert: true,
  });
};

const getAllLessons = async (role: string) => {
  if (role === userRole.user) {
    const vocab = await vocabModel.find();
    return await lessonModel
      .find({
        _id: { $in: vocab.map((item) => item.lessonId) },
      })
      .populate('adminId updatedId');
  }

  return await lessonModel.find().populate('adminId updatedId');
};

const getSingleLesson = async (id: string) => {
  const findLesson = await lessonModel
    .findById(id)
    .populate('adminId updatedId');

  if (!findLesson) {
    throw new appError('lesson not found', httpStatus.NOT_FOUND);
  }

  return findLesson;
};

const updateLesson = async (id: string, payload: Partial<lessonTypes>) => {
  const findLesson = await lessonModel.findById(id);

  if (!findLesson) {
    throw new appError('Lesson not found', httpStatus.NOT_FOUND);
  }
  return await lessonModel.findByIdAndUpdate(id, payload, { new: true });
};

const getStats = async () => {
  const created = await lessonModel.countDocuments();

  const edited = await lessonModel.countDocuments({
    updatedId: { $exists: true },
  });

  const completed = await lessonModel.countDocuments({
    reason: { $exists: true },
  });

  return { created, edited, completed };
};

const completeLesson = async (id: string, userId: string) => {
  const findLesson = await lessonModel.findById(id);

  if (!findLesson) {
    throw new appError('lesson not found', httpStatus.NOT_FOUND);
  }

  // start session
  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    const lessonUpdate = await lessonModel.findByIdAndUpdate(
      id,
      { isCompleted: true },
      { new: true }
    );

    const findHistory = await lessonHistoryModel.findOne({
      userId: userId,
      lessonId: id,
    });

    if (findHistory) {
      throw new appError('lesson already exists', httpStatus.CONFLICT);
    }

    const lessonHistory = await lessonHistoryModel.create({
      userId,
      lessonId: id,
    });

    session.commitTransaction();

    session.endSession();

    return {
      lessonHistory,
      lessonUpdate,
    };
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();
    throw new appError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const lessonService = {
  insertLesson,
  getAllLessons,
  getSingleLesson,
  updateLesson,
  getStats,
  completeLesson,
};
