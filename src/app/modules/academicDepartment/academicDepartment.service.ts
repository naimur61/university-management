import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { AcademicDepartment } from './academicDepartment..model';
import { IAcademicDepartment } from './academicDepartment.interface';

const createDepartmentToDB = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);

  if (!result) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to create Department!',
    );
  }
  return result;
};

export const AcademicDepartmentService = {
  createDepartmentToDB,
};
