import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../Interface/common';
import { IPaginationOptions } from '../../../Interface/pagination';
import config from '../../../config';
import { ApiError } from '../../../errors/ApiError';
import { HelperPagination } from '../../../helpers/paginationHelpers';
import { userSearchableFields } from './user.constants';
import { IUser, IUserFilter } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createUserToDB = async (user: IUser): Promise<IUser> => {
  const academicSemester = {
    code: '01',
    year: '2023',
  };
  const id = await generateStudentId(academicSemester);
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

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await User.find(whereCondition)
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

const getSingleUserFromDB = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);

  return result;
};

const deleteUserFromDB = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};

const updateUserToDB = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const UserService = {
  createUserToDB,
  getUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserToDB,
};
