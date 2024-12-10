import appError from '@app/errors/appError';
import userModel from './user.schema';
import { userLoginTypes, userTypes } from './user.types';
import httpStatus from 'http-status';
import createEncryptedToken from '@app/libs/generateToken';
import { Types } from 'mongoose';

const insertUser = async (payload: userTypes) => {
  const findUser = await userModel.findOne({ email: payload.email });

  if (findUser) {
    throw new appError('user already exists', httpStatus.CONFLICT);
  }

  return await userModel.create(payload);
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

const getAllUsers = async () => {
  return await userModel.find();
};

const getUserById = async (id: Types.ObjectId) => {
  const findUser = await userModel.findById(id);

  if (!findUser) {
    throw new appError('user not found', httpStatus.NOT_FOUND);
  }

  return await userModel.findById(id);
};

const updateUser = async (id: string, payload: Partial<userTypes>) => {
  const findUser = await userModel.findById(id);

  if (!findUser) {
    throw new appError('user not found', httpStatus.NOT_FOUND);
  }

  return await userModel.findByIdAndUpdate(id, payload, { new: true });
};

export const userService = {
  insertUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
};
