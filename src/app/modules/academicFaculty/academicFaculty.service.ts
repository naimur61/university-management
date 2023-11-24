import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import { IGenericResponse } from '../../../Interface/common';
import { IPaginationOptions } from '../../../Interface/pagination';
import { HelperPagination } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { academicFacultySearchableFields } from './academicFaculty.constant';

const createFacultyToDB = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);

  if (!result) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to create user!');
  }
  return result;
};

const getFacultiesFromDB = async (
  filters: IAcademicFacultyFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    HelperPagination.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySearchableFields.map(field => ({
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

  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFacultyFromBD = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);

  return result;
};

const updateFacultyToDB = async (
  id: string,
  payload: Partial<IAcademicFaculty>,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteFacultyFromDB = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);

  return result;
};

export const AcademicFacultyService = {
  createFacultyToDB,
  getFacultiesFromDB,
  getSingleFacultyFromBD,
  updateFacultyToDB,
  deleteFacultyFromDB,
};
