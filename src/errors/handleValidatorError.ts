import { Error as MongooseError } from 'mongoose';
import { IGenericErrorMessages } from '../Interface/interface.error';
import IGenericErrorResponse from '../Interface/common';
import httpStatus from 'http-status';

const handleValidatorError = (
  err: MongooseError.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = Object.values(err.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });
  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  };
};

export default handleValidatorError;
