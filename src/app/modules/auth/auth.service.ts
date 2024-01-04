import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser, IUserLoginResponse } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';

const userLogin = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
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

  const { id: usrId, role, isNeedsChangePass } = isUserExit;
  const accessToken = jwtHelper.createToken(
    { id: usrId, role: role },
    config.jwt.secrete as Secret,
    { expireIn: config.jwt.secrete_expire_in },
  );

  const refreshToken = jwtHelper.createToken(
    { id: usrId, role: role },
    config.jwt.refresh_secrete as Secret,
    { expireIn: config.jwt.refresh_secrete_expire_in },
  );

  return {
    accessToken,
    refreshToken,
    isNeedsChangePass,
  };
};

export const AuthService = {
  userLogin,
};
