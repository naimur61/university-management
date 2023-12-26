import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const userLogin = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const isUserExits = await User.find(
    { id },
    { id: 1, password: 1, isNeedsChangePass: 1 },
  );

  return {};
};

export const AuthService = {
  userLogin,
};
