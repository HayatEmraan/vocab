/* eslint-disable @typescript-eslint/no-explicit-any */
import appError from '@app/errors/appError';
import userModel from './user.schema';
import { userLoginTypes, userReason, userTypes } from './user.types';
import httpStatus from 'http-status';
import createEncryptedToken from '@app/libs/generateToken';
import mongoose, { Types } from 'mongoose';
import {
  lessonHistoryModel,
  userHistoryModel,
  vocabHistoryModel,
} from '../history/history.schema';

const insertUser = async (payload: userTypes) => {
  const findUser = await userModel.findOne({ email: payload.email });

  if (findUser) {
    throw new appError('user already exists', httpStatus.CONFLICT);
  }

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    const user = await userModel.create(payload);

    await userHistoryModel.create({
      reason: 'self registration',
      userId: user._id,
    });

    await session.commitTransaction();
    await session.endSession();

    return user;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new appError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const loginUser = async ({ email, password }: userLoginTypes) => {
  const findUser = await userModel.findOne({ email, isActive: true });

  if (!findUser) {
    throw new appError('user not found', httpStatus.NOT_FOUND);
  }

  const passwordMatch = await userModel.isPasswordMatch(
    password,
    findUser.password
  );

  if (!passwordMatch) {
    throw new appError('invalid password or email', httpStatus.NOT_FOUND);
  }

  const encrypt = {
    _id: findUser._id,
    email: findUser.email,
    role: findUser.role,
    isActive: findUser.isActive,
  };

  const { iv, encryptedToken } = createEncryptedToken(encrypt);

  return { iv, encryptedToken };
};

const getAllUsers = async (id: string) => {
  return await userHistoryModel
    .find({
      userId: {
        $ne: id,
      },
    })
    .populate('userId adminId');
};

const getUserById = async (id: Types.ObjectId) => {
  const findUser = await userModel.findById(id);

  if (!findUser) {
    throw new appError('user not found', httpStatus.NOT_FOUND);
  }

  return await userModel.findById(id);
};

const updateUser = async (
  id: string,
  payload: Partial<userTypes> & userReason
) => {
  const { reason, adminId, ...props } = payload;

  const findUser = await userModel.findById(id);

  if (!findUser) {
    throw new appError('user not found', httpStatus.NOT_FOUND);
  }

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    await userHistoryModel.findOneAndUpdate(
      {
        userId: id,
      },
      {
        ...payload,
        adminId: adminId,
        reason: reason,
        userId: id,
      }
    );

    const result = await userModel.findByIdAndUpdate(id, props, { new: true });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new appError(error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getStats = async () => {
  const total = await userModel.countDocuments();

  const admin = await userModel.countDocuments({
    role: 'admin',
  });

  const user = await userModel.countDocuments({
    role: 'user',
  });

  return { total, admin, user };
};

const lessonStats = async (id: string) => {
  const lesson = await lessonHistoryModel
    .find({
      userId: id,
    })
    .countDocuments();

  const vocab = await vocabHistoryModel
    .find({
      userId: id,
    })
    .countDocuments();

  // group by date and return count document

  const groupByLesson = await lessonHistoryModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        count: 1,
      },
    },
  ]);

  const groupByVocab = await vocabHistoryModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        count: 1,
      },
    },
  ]);

  return {
    lesson,
    vocab,
    groupBy: {
      lesson: groupByLesson,
      vocab: groupByVocab,
    },
  };
};

export const userService = {
  insertUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  getStats,
  lessonStats,
};
