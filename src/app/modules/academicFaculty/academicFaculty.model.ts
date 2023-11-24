import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.interface';

const AcademicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicFacultyModel
>(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicSemesterModel>(
  'AcademicFaculty',
  AcademicFacultySchema,
);
