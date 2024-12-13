/* eslint-disable @typescript-eslint/no-explicit-any */
import appError from '@app/errors/appError';
import vocabModel from './vacab.schema';
import { vocabTypes } from './vacab.types';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { vocabHistoryModel } from '../history/history.schema';

const insertVocab = async (payload: vocabTypes) => {
  const { id, ...props } = payload;
  return await vocabModel.findByIdAndUpdate(id, props, {
    new: true,
    upsert: true,
  });
};

const getAllVocab = async () => {
  return await vocabModel.find().populate('lessonId adminId updatedId');
};

const getSingleVocab = async (id: string) => {
  const findVocab = await vocabModel.findById(id);

  if (!findVocab) {
    throw new appError('Vocab not found', httpStatus.NOT_FOUND);
  }
  return await vocabModel.findById(id).populate('lessonId adminId updatedId');
};

const updateVocab = async (id: string, payload: Partial<vocabTypes>) => {
  const findVocab = await vocabModel.findById(id);

  if (!findVocab) {
    throw new appError('Vocab not found', httpStatus.NOT_FOUND);
  }
  return await vocabModel.findByIdAndUpdate(id, payload, { new: true });
};

const completeVocab = async (id: string, userId: string) => {
  const findVocab = await vocabModel.findById(id);

  if (!findVocab) {
    throw new appError('vocab not found', httpStatus.NOT_FOUND);
  }

  // start session
  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    const vocabUpdate = await vocabModel.findByIdAndUpdate(
      id,
      { isCompleted: true },
      { new: true }
    );

    const vocabHistory = await vocabHistoryModel.findOneAndUpdate(
      {
        userId,
        lessonId: findVocab.lessonId,
        vocabId: id,
      },
      {
        userId,
        lessonId: findVocab.lessonId,
        vocabId: id,
      },
      {
        new: true,
        upsert: true,
      }
    );

    await session.commitTransaction();

    await session.endSession();

    return {
      vocabHistory,
      vocabUpdate,
    };
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();
    throw new appError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getStats = async () => {
  const total = await vocabModel.countDocuments();

  const completed = await vocabModel.countDocuments({
    isCompleted: true,
  });

  const inCompleted = await vocabModel.countDocuments({
    isCompleted: false,
  });

  return { total, completed, inCompleted };
};

const vocabByLesson = async (id: string, userId: string) => {
  const completedVocab = await vocabHistoryModel.find({
    userId,
    lessonId: id,
  });

  const completedVocabIds = completedVocab.map((vocab) =>
    vocab.vocabId.toString()
  );

  const vocabDocuments = await vocabModel
    .find({ lessonId: id })
    .sort({ createdAt: -1 })
    .populate('adminId lessonId');

  const vocabWithCompletionStatus = vocabDocuments.map((vocab) => {
    return {
      ...vocab.toObject(),
      completed: completedVocabIds.includes(vocab._id.toString())
        ? true
        : false,
    };
  });

  return vocabWithCompletionStatus;
};

export const vocabService = {
  insertVocab,
  getAllVocab,
  getSingleVocab,
  updateVocab,
  completeVocab,
  getStats,
  vocabByLesson,
};
