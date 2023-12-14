import { Model } from 'mongoose';
export type IUserRole = 'student' | 'admin' | 'faculty';

export type IUser = {
  id: string;
  role: IUserRole;
  password: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
export type IUserFilter = { searchTerm?: string };
