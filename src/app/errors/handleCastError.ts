import { Error } from 'mongoose';

export const handleCastError = (error: Error.CastError) => {
  return [
    {
      path: error.path,
      message: error.message,
    },
  ];
};
