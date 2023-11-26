import { Model } from 'mongoose';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: string;
};

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;
