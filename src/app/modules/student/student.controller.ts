import { StudentService } from './student.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { RequestHandler } from 'express';
import paginationKey from '../../../constants/constants';
import pick from '../../../shared/pick';
import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constants';

const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationKey);

  const result = await StudentService.getAllStudentFromDB(
    filters,
    paginationOptions,
  );

  sendResponse<IStudent[]>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Student retried successful.',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const studentID = req.params.id;
  const result = await StudentService.getSingleStudentFromDB(studentID);

  sendResponse<IStudent>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Student retried successful.',
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudentFromDB(id);

  sendResponse<IStudent>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Student Deleted successful!',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const result = await StudentService.updateStudentToDB(id, body);

  sendResponse<IStudent>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Student updated successful.',
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
