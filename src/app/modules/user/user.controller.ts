import { UserService } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { RequestHandler } from 'express';
import paginationKey from '../../../constants/constants';
import pick from '../../../shared/pick';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...user } = req.body;

  const result = await UserService.createUserToDB(user);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'User successfully created!',
    data: result,
  });
});

const getUser: RequestHandler = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationKey);
});

export const UserController = {
  createUser,
  getUser,
};
