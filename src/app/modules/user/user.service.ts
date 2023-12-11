import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../Interface/common';
import { IPaginationOptions } from '../../../Interface/pagination';
import config from '../../../config';
import { ApiError } from '../../../errors/ApiError';
import { HelperPagination } from '../../../helpers/paginationHelpers';
import { userSearchableFields } from './user.constants';
import { IUser, IUserFilter } from './user.interface';
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

const getUserFromDB = async (
  filters: IUserFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { sortBy, sortOrder, limit, skip, page } =
    HelperPagination.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, options: 'i' },
      })),
    });
  }

  const result = await User.find({ $and: andCondition })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments();

  return {
    meta: {
      total,
      limit,
      page,
    },
    data: result,
  };
};

export const UserService = {
  createUserToDB,
  getUserFromDB,
};
