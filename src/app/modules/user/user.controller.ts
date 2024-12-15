/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const { _id } = req.user;
  const data = await userService.updateUser(req.params.id, {
    ...req.body,
    adminId: _id,
  });

  globalReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user updated successfully',
    data,
  });
};

const getAllUsers: RequestHandler = async (req, res) => {
  const { _id } = req.user;
  const data = await userService.getAllUsers(_id);

  globalReturn<any[]>(res, {
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
    // secure: false,
    path: '/',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie('iv', iv, {
    httpOnly: true,
    // secure: false,
    path: '/',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

  globalReturn(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user logged in successfully',
    data: {
      token: encryptedToken,
      iv,
    },
  });
};

const getStats: RequestHandler = async (req, res) => {
  const data = await userService.getStats();
  globalReturn<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user stats fetched successfully',
    data,
  });
};

const lessonStats: RequestHandler = async (req, res) => {
  const { _id } = req.user;
  const data = await userService.lessonStats(_id);
  globalReturn<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user lesson stats fetched successfully',
    data,
  });
};

export const userController = {
  createUser: catchAsync(createUser),
  getMe: catchAsync(getMe),
  updateUser: catchAsync(updateUser),
  getAllUsers: catchAsync(getAllUsers),
  loginUser: catchAsync(loginUser),
  getStats: catchAsync(getStats),
  lessonStats: catchAsync(lessonStats),
};
