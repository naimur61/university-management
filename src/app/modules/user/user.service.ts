import mongoose, { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../Interface/common';
import { IPaginationOptions } from '../../../Interface/pagination';
import config from '../../../config';
import { ApiError } from '../../../errors/ApiError';
import { HelperPagination } from '../../../helpers/paginationHelpers';
import { userSearchableFields } from './user.constants';
import { IUser, IUserFilter } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { IStudent } from '../student/student.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.Interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import bcrypt from 'bcrypt';

const createStudentToDB = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // Bcrypt Password
  user.password = await bcrypt.hashSync(
    user.password,
    Number(config.bcrypt_salt_round),
  );

  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  );

  let newUserAllData = null;

  const session = await mongoose.startSession();

  // eslint-disable-next-line no-useless-catch
  try {
    await session.startTransaction();

    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Student create failed!');
    }

    // set ref with student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User create failed!');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }

  return newUserAllData;
};

const createFacultyToDB = async (
  faculty: IFaculty,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }
  user.role = 'faculty';

  let newUserAllData = null;

  const session = await mongoose.startSession();

  // eslint-disable-next-line no-useless-catch
  try {
    await session.startTransaction();

    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newStudent = await Faculty.create([faculty], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty create failed!');
    }

    // set ref with faculty
    user.faculty = newStudent[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User create failed!');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [{ path: 'academicDepartment' }, { path: 'academicFaculty' }],
    });
  }

  return newUserAllData;
};

const createAdminToDB = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  user.role = 'admin';

  let newUserAllData = null;

  const session = await mongoose.startSession();

  // eslint-disable-next-line no-useless-catch
  try {
    await session.startTransaction();

    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newStudent = await Admin.create([admin], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Admin create failed!');
    }

    // set ref with Admin
    user.admin = newStudent[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User create failed!');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [{ path: 'managementDepartment' }],
    });
  }

  return newUserAllData;
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
  createStudentToDB,
  createFacultyToDB,
  createAdminToDB,
  getUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserToDB,
};
