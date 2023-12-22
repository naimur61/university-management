/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, startSession } from 'mongoose';
import { IGenericResponse } from '../../../Interface/common';
import { IPaginationOptions } from '../../../Interface/pagination';
import { HelperPagination } from '../../../helpers/paginationHelpers';
import { ApiError } from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { IFaculty, IFacultyFilters } from './faculty.Interface';
import { facultySearchableFields } from './faculty.constants';
import { Faculty } from './faculty.model';

const getAllFacultyFromDB = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFaculty[]>> => {
  const { sortBy, sortOrder, limit, skip, page } =
    HelperPagination.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: facultySearchableFields.map(field => ({
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

  const result = await Faculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments(whereCondition);

  return {
    meta: {
      total,
      limit,
      page,
    },
    data: result,
  };
};

const getSingleFacultyFromDB = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id);

  return result;
};

const deleteFacultyFromDB = async (id: string): Promise<IFaculty | null> => {
  let result = null;

  const session = await startSession();
  try {
    await session.startTransaction();
    const user = await User.findOneAndDelete({ id });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User Deleted failed!');
    }

    const faculty = await Faculty.findOneAndDelete({ id });
    if (!faculty) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty Deleted failed!');
    }

    result = faculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return result;
};

const updateFacultyToDB = async (id: string, payload: Partial<IFaculty>) => {
  const { name, ...FacultyData } = payload;

  const ifExits = await Faculty.findOne({ id });
  if (!ifExits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty Not Found!');
  }

  const updatedFacultyData = { ...FacultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  });

  return result;
};

export const FacultyService = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  deleteFacultyFromDB,
  updateFacultyToDB,
};
