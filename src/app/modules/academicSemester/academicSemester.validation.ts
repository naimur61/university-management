import { z } from 'zod';
import { AcademicSemesterTypes } from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(
      [...(AcademicSemesterTypes.Titles as [string, ...string[]])],
      {
        required_error: 'Title is required',
      },
    ),
    year: z.string({ required_error: 'Year is required' }),
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

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...(AcademicSemesterTypes.Titles as [string, ...string[]])], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z.string({ required_error: 'Year is required' }).optional(),
      code: z
        .enum([...(AcademicSemesterTypes.Codes as [string, ...string[]])], {
          required_error: 'Code is required',
        })
        .optional(),
      startMonth: z
        .enum([...(AcademicSemesterTypes.Months as [string, ...string[]])], {
          required_error: 'Start month  is required',
        })
        .optional(),
      endMonth: z
        .enum([...(AcademicSemesterTypes.Months as [string, ...string[]])], {
          required_error: 'End month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.code && data.body.title) ||
      (!data.body.code && data.body.title),
    {
      message: 'Either both code and title should be provided or neither!',
    },
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
