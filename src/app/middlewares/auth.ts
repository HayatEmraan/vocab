import appError from '@app/errors/appError';
import decryptToken from '@app/libs/extracToken';
import userModel from '@app/modules/user/user.schema';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token;
      const iv = req.cookies.iv;

      if (!token) {
        throw new appError('access not granted', httpStatus.UNAUTHORIZED);
      }

      const decode = await decryptToken(token as string, iv as string);

      const { role, email } = decode;

      if (!roles.includes(role)) {
        throw new appError('user access unauthorized', httpStatus.UNAUTHORIZED);
      }

      const findUser = await userModel.findOne({ email, isActive: true });

      if (!findUser) {
        throw new appError('user not found or inactive', httpStatus.NOT_FOUND);
      }
      req.user = decode;
      next();
    } catch (error) {
      next(error);
    }
  };
};
