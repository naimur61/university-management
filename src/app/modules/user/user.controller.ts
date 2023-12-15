import { UserService } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { RequestHandler } from 'express';
import paginationKey from '../../../constants/constants';
import pick from '../../../shared/pick';
import { IUser } from './user.interface';
import { userFilterableFields } from './user.constants';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { student, ...userData } = req.body;

  const result = await UserService.createStudentToDB(student, userData);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'User successfully created!',
    data: result,
  });
});

const getUser: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationKey);

  const result = await UserService.getUserFromDB(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'User retried successful.',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
  const userID = req.params.id;
  const result = await UserService.getSingleUserFromDB(userID);

  sendResponse<IUser>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'User retried successful.',
    data: result,
  });
});

const deleteUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserService.deleteUserFromDB(id);

  sendResponse<IUser>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'User Deleted successful!',
    data: result,
  });
});

const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const result = await UserService.updateUserToDB(id, body);

  sendResponse<IUser>(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'User update successful.',
    data: result,
  });
});

export const UserController = {
  createStudent,
  getUser,
  getSingleUser,
  deleteUser,
  updateUser,
};
