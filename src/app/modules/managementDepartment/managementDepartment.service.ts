import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { ManagementDepartment } from './managementDepartment.model';
import {
  IManagementDepartment,
  IManagementDepartmentFilterRequest,
} from './managementDepartment.interface';
import { IPaginationOptions } from '../../../Interface/pagination';
import { HelperPagination } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { managementDepartmentSearchableFields } from './managementDepartment.constant';

const createDepartmentToDB = async (payload: IManagementDepartment) => {
  const result = (await ManagementDepartment.create(payload)).populate(
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
  payload: Partial<IManagementDepartment>,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
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
  filters: IManagementDepartmentFilterRequest,
  paginationOptions: IPaginationOptions,
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    HelperPagination.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: managementDepartmentSearchableFields.map(field => ({
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

  const result = await ManagementDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments();

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
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);

  return result;
};

const getSingleDepartment = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);

  return result;
};

export const ManagementDepartmentService = {
  createDepartmentToDB,
  getDepartmentsFromDB,
  updateDepartmentToDB,
  deleteDepartmentFromDB,
  getSingleDepartment,
};
