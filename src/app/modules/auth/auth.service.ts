import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const userLogin = async (payload: ILoginUser) => {
  const { id, password } = payload;

  // Create and instance for user
  const user = new User();

  // check User exit
  const isUserExit = await user.isUserExit(id);

  if (!isUserExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exit!');
  }

  //   Check password Matched
  if (
    isUserExit.password &&
    (await user.isPasswordMatched(password, isUserExit.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
  }
  return {
    isUserExit,
  };
};

export const AuthService = {
  userLogin,
};
