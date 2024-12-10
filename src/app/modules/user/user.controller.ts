import { catchAsync } from '@app/utils/catchAsync';
import globalReturn from '@app/utils/globalReturn';
import { RequestHandler } from 'express';
import { userService } from './user.service';
import { userTypes } from './user.types';
import httpStatus from 'http-status';

const createUser: RequestHandler = async (req, res) => {
  const data = await userService.insertUser(req.body);
  globalReturn<userTypes>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'user created successfully',
    data,
  });
};

const getMe: RequestHandler = async (req, res) => {
  const data = await userService.getUserById(req.user._id);

  globalReturn<userTypes | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user fetched successfully',
    data,
  });
};

const updateUser: RequestHandler = async (req, res) => {
  globalReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user updated successfully',
    data: null,
  });
};

const getAllUsers: RequestHandler = async (req, res) => {
  const data = await userService.getAllUsers();
  globalReturn<userTypes[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'users fetched successfully',
    data,
  });
};

const loginUser: RequestHandler = async (req, res) => {
  const { iv, encryptedToken } = await userService.loginUser(req.body);

  res.cookie('token', encryptedToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie('iv', iv, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  globalReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user logged in successfully',
    data: null,
  });
};

export const userController = {
  createUser: catchAsync(createUser),
  getMe: catchAsync(getMe),
  updateUser: catchAsync(updateUser),
  getAllUsers: catchAsync(getAllUsers),
  loginUser: catchAsync(loginUser),
};
