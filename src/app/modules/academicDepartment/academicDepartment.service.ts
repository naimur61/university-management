import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { AcademicDepartment } from './academicDepartment..model';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilterRequest,
} from './academicDepartment.interface';
import { IPaginationOptions } from '../../../Interface/pagination';
import { HelperPagination } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';

const createDepartmentToDB = async (payload: IAcademicDepartment) => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty',
  );

  if (!result) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to create Department!',
    );
  }
  return result;
};

const updateDepartmentToDB = async (
  id: string,
  payload: Partial<IAcademicDepartment>,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  ).populate('academicFaculty');

  if (!result) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to create Department!',
    );
  }
  return result;
};

const getDepartmentsFromDB = async (
  filters: IAcademicDepartmentFilterRequest,
  paginationOptions: IPaginationOptions,
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    HelperPagination.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const deleteDepartmentFromDB = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);

  return result;
};

const getSingleDepartment = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id);

  return result;
};

export const AcademicDepartmentService = {
  createDepartmentToDB,
  getDepartmentsFromDB,
  updateDepartmentToDB,
  deleteDepartmentFromDB,
  getSingleDepartment,
};
