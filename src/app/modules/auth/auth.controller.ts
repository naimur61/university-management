import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const userLogin = catchAsync(async (req, res) => {
  const loginData = req.body;

  const result = await AuthService.userLogin(loginData);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'User successfully created!',
    data: result,
  });
});

export const AuthController = { userLogin };
