import z from 'zod';
import { BloodGroup, Gender } from './admin.constant';

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
    profileImage: z.string().optional(),
    designation: z.string().optional(),
    managementDepartment: z.string().optional(),
  }),
});

export const AdminValidation = {
  updateAdminZodSchema,
};
