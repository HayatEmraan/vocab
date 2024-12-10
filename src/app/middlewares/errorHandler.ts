/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import appError from '@app/errors/appError';
import { handleCastError } from '@app/errors/handleCastError';
import { handleDuplicateError } from '@app/errors/handleDupError';
import { handleValidationError } from '@app/errors/handleValidateError';
import { handleZodError } from '@app/errors/handleZodError';
import { env } from '@config/index';
import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';

const errorHandler: ErrorRequestHandler = async (error, req, res, next) => {
  let message = error.message || 'Something went wrong';
  let errStack = error;
  let status = error.statusCode || 500;

  if (error instanceof ZodError) {
    const err = handleZodError(error);
    message = err.message;
    errStack = err.error;
  } else if (error instanceof mongoose.Error.CastError) {
    message = 'Invalid _id';
    errStack = handleCastError(error);
  } else if (error instanceof mongoose.Error.ValidationError) {
    message = 'Validation Error';
    errStack = handleValidationError(error);
  } else if (error.code === 11000) {
    message = 'Duplicate value entered';
    errStack = handleDuplicateError(error);
  } else if (error instanceof appError) {
    message = error.message;
    errStack = error;
  }

  res.status(status).json({
    success: false,
    message: message,
    error: errStack,
    stack: env.NODE_ENV === 'development' ? error.stack : undefined,
  });
};

export default errorHandler;
