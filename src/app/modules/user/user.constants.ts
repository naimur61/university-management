import { IUserRole } from './user.interface';

export const userSearchableFields = ['role'];
export const userFilterableFields = ['searchTerm', 'role'];

const Role: IUserRole[] = ['student', 'admin', 'faculty'];

export const UserTypes = {
  Role,
};
