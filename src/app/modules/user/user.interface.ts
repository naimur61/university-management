import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.Interface';
import { IAdmin } from '../admin/admin.interface';
export type IUserRole = 'student' | 'admin' | 'faculty';

export type IUser = {
  id: string;
  role: IUserRole;
  password: string;
  isNeedsChangePass: true | false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

export type IUserMethod = {
  isUserExit(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethod>;

export type IUserFilter = { searchTerm?: string };
