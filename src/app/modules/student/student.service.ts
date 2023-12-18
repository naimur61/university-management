import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../Interface/common';
import { IPaginationOptions } from '../../../Interface/pagination';
import { HelperPagination } from '../../../helpers/paginationHelpers';
import { IStudent, IStudentFilters } from './student.interface';
import { studentSearchableFields } from './student.constants';
import { Student } from './student.model';

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
  const result = await Student.findByIdAndDelete(id);

  return result;
};

const updateStudentToDB = async (id: string, payload: Partial<IStudent>) => {
  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
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
