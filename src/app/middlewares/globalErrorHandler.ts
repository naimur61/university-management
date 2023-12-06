/* eslint-disable no-unused-expressions */

import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessages } from '../../Interface/interface.error';
import handleValidatorError from '../../errors/handleValidatorError';
import { ApiError } from '../../errors/ApiError';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? errorLogger.error('Global Error Handler~', error.message)
    : errorLogger.error('Global Error Handler~');

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessage: IGenericErrorMessages[] = [];

  if (error?.name === 'ValidatorError') {
    const simplifiedError = handleValidatorError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);

    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    // eslint-disable-next-line no-undefined
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
