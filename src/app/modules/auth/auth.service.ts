import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const userLogin = async (payload: ILoginUser) => {
  const { id, password } = payload;

  // Create and instance for user
  const user = new User();

  //   Check User Exist
  // const isUserExit = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, isNeedsChangePass: 1 },
  // ).lean();
  // if (!isUserExit) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exit!');
  // }

  //   Check password Matched
  const isPasswordMatched = await bcrypt.compare(password, isUserExit.password);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
  }
  return {};
};

export const AuthService = {
  userLogin,
};
