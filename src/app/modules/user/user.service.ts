import config from '../../../config';
import { ApiError } from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import generateUserId from './user.utils';

const createUserToDB = async (user: IUser): Promise<IUser> => {
  const id = await generateUserId();
  user.id = id;

  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

export const UserService = {
  createUserToDB,
};
