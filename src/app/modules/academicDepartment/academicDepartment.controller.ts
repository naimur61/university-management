import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { ...academicDepartment } = req.body;
  const result =
    await AcademicDepartmentService.createDepartmentToDB(academicDepartment);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Department Create Successful!',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
};
