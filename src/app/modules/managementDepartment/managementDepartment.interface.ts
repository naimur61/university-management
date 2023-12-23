import { Model, Types } from 'mongoose';

export type IManagementDepartment = {
  title: string;
};

export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;

export type IManagementDepartmentFilterRequest = {
  searchTerm?: string;
  ManagementFaculty?: Types.ObjectId;
};
