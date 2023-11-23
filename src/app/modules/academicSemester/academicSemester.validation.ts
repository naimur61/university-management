import { z } from 'zod';
import { AcademicSemesterTypes } from './academicSemester.constant';

const AcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(
      [...(AcademicSemesterTypes.Titles as [string, ...string[]])],
      {
        required_error: 'Title is required',
      },
    ),
    year: z.number({ required_error: 'Year is required' }),
    code: z.enum([...(AcademicSemesterTypes.Codes as [string, ...string[]])], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum(
      [...(AcademicSemesterTypes.Months as [string, ...string[]])],
      { required_error: 'Start month  is required' },
    ),
    endMonth: z.enum(
      [...(AcademicSemesterTypes.Months as [string, ...string[]])],
      { required_error: 'End month is required' },
    ),
  }),
});

export const AcademicSemesterValidation = { AcademicSemesterZodSchema };
