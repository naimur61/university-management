import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.Interface';
import { IAdmin } from '../admin/admin.interface';
export type IUserRole = 'student' | 'admin' | 'faculty';

export type IUser = {
  id: string;
  role: IUserRole;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
export type IUserFilter = { searchTerm?: string };
