import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { IGenericErrorMessages } from '../Interface/interface.error';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessages[] = [
    {
      path: error.path,
      message: 'Invalid Id!',
    },
  ];

  const statusCode = httpStatus.NOT_FOUND;

  return {
    statusCode,
    message: 'Cast error',
    errorMessage: errors,
  };
};

export default handleCastError;
