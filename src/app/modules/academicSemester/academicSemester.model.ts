import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import { AcademicSemesterTypes } from './academicSemester.constant';
import { ApiError } from '../../../errors/ApiError';
import status from 'http-status';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      enum: AcademicSemesterTypes.Titles,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterTypes.Codes,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterTypes.Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterTypes.Months,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre<IAcademicSemester>('save', async function (next) {
  const isExit = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExit) {
    throw new ApiError(status.CONFLICT, 'Academic Semester is already exist!');
  }

  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema,
);
