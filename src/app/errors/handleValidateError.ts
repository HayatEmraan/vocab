import { Error } from 'mongoose';

export const handleValidationError = (error: Error.ValidationError) => {
  return Object.values(error.errors).map((error) => {
    return {
      path: error.path,
      message: error.message,
    };
  });
};
