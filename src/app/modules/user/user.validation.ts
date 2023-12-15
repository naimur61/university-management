import { z } from 'zod';
import { UserTypes } from './user.constants';
import { BloodGroup, Gender } from '../student/student.constants';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required!' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'First Name is required!' }),
      }),
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: 'Gender is required!',
      }),
      dateOfBirth: z.string({ required_error: 'Date of Birth is required!' }),
      email: z.string({ required_error: 'Email is required!' }),
      contactNo: z.string({ required_error: 'Contact number is required!' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact number is required!',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required!',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required!',
      }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father name is required!' }),
        fatherOccupation: z.string({
          required_error: 'Father occupation name is required!',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required!',
        }),
        motherName: z.string({ required_error: 'Mother name is required!' }),
        motherOccupation: z.string({
          required_error: 'Mother occupation name is required!',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required!',
        }),
        address: z.string({ required_error: 'Address is required!' }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Local Guardian name is required!' }),
        occupation: z.string({
          required_error: 'Local Guardian occupation is required!',
        }),
        contactNo: z.string({
          required_error: 'Local Guardian contact number is required!',
        }),
        address: z.string({
          required_error: 'Local Guardian address is required!',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...(UserTypes.Role as [string, ...string[]])], {
      required_error: 'role is required.',
    }),
    password: z.string().optional(),
  }),
});

export const UserValidation = { createUserZodSchema, updateUserZodSchema };
