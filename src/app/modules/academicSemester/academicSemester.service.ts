import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
  academicSemesterTitleCodeMapper,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { ISemesterPagination } from '../../../Interface/semesterPagination';
import { IGenericResponse } from '../../../Interface/common';
import { HelperPagination } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { academicSemesterSearchableFields } from './academicSemester.constant';

const createSemesterToDB = async (payload: IAcademicSemester) => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }

  const result = await AcademicSemester.create(payload);
  if (!result) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to create user!');
  }
  return result;
};

const getSemestersFromDB = async (
  filters: IAcademicSemesterFilter,
  paginationOptions: ISemesterPagination,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    HelperPagination.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchableFields.map(field => ({
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

  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       // {
  //       //   year: {
  //       //     $regex: searchTerm,
  //       //     $options: 'i',
  //       //   },
  //       // },
  //     ],
  //   },
  // ];

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find({ $and: andCondition })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemesterToDB,
  getSemestersFromDB,
};
//
