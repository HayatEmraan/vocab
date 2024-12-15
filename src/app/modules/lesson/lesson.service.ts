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
  return await lessonModel.findOneAndUpdate(
    {
      _id: id,
    },
    props,
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );
};

const findLesson = async (id: string) => {
  return await lessonModel.findById(id);
};

const getAllLessons = async (role: string) => {
  if (role === userRole.user) {
    const durations = await vocabModel.aggregate([
      {
        $group: {
          _id: '$lessonId',
          duration: { $sum: '$duration' },
        },
      },
    ]);

    const lesson = await lessonModel
      .find({
        _id: { $in: durations.map((item) => item._id) },
      })
      .populate('adminId updatedId');

    return lesson.map((lesson) => ({
      ...lesson.toObject(),
      duration: durations.find((v) => v._id.equals(lesson._id))?.duration || 0,
    }));
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

    const lessonHistory = await lessonHistoryModel.findOneAndUpdate(
      {
        userId,
        lessonId: id,
      },
      {
        userId,
        lessonId: id,
      },
      { new: true, upsert: true }
    );

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
  findLesson,
};
