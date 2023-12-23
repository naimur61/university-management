/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, startSession } from 'mongoose';
import { IGenericResponse } from '../../../Interface/common';
import { IPaginationOptions } from '../../../Interface/pagination';
import { HelperPagination } from '../../../helpers/paginationHelpers';
import { ApiError } from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { Admin } from './admin.model';
import { adminSearchableFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';

const getAllAdminFromDB = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAdmin[]>> => {
  const { sortBy, sortOrder, limit, skip, page } =
    HelperPagination.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: adminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Admin.countDocuments(whereCondition);

  return {
    meta: {
      total,
      limit,
      page,
    },
    data: result,
  };
};

const getSingleAdminFromDB = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id);

  return result;
};

const deleteAdminFromDB = async (id: string): Promise<IAdmin | null> => {
  let result = null;

  const session = await startSession();
  try {
    await session.startTransaction();
    const user = await User.findOneAndDelete({ id });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User Deleted failed!');
    }

    const admin = await Admin.findOneAndDelete({ id });
    if (!Admin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Admin Deleted failed!');
    }

    result = admin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return result;
};

const updateAdminToDB = async (id: string, payload: Partial<IAdmin>) => {
  const { name, ...AdminData } = payload;

  const ifExits = await Admin.findOne({ id });
  if (!ifExits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not Found!');
  }

  const updatedAdminData = { ...AdminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  });

  return result;
};

export const AdminService = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB,
  updateAdminToDB,
};
