/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, startSession } from 'mongoose';
import { IGenericResponse } from '../../../Interface/common';
import { IPaginationOptions } from '../../../Interface/pagination';
import { HelperPagination } from '../../../helpers/paginationHelpers';
import { IStudent, IStudentFilters } from './student.interface';
import { studentSearchableFields } from './student.constants';
import { Student } from './student.model';
import { ApiError } from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudentFromDB = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  const { sortBy, sortOrder, limit, skip, page } =
    HelperPagination.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map(field => ({
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

  const result = await Student.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereCondition);

  return {
    meta: {
      total,
      limit,
      page,
    },
    data: result,
  };
};

const getSingleStudentFromDB = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id);

  return result;
};

const deleteStudentFromDB = async (id: string): Promise<IStudent | null> => {
  let result = null;

  const session = await startSession();
  try {
    await session.startTransaction();
    const user = await User.findOneAndDelete({ id });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User Deleted failed!');
    }

    const student = await Student.findOneAndDelete({ id });
    if (!student) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Student Deleted failed!');
    }

    result = student;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return result;
};

const updateStudentToDB = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, localGuardian, ...studentData } = payload;

  const ifExits = await Student.findOne({ id });
  if (!ifExits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found!');
  }

  const updatedStudentData = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });

  return result;
};

export const StudentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentToDB,
};
