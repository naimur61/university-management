import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessages } from '../Interface/interface.error';
import IGenericErrorResponse from '../Interface/common';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    },
  );

  const statusCode = 500;

  return {
    statusCode,
    message: 'validation error',
    errorMessage: errors,
  };
};

export default handleZodError;
