import { z } from 'zod';
import { UserTypes } from './user.constants';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...(UserTypes.Role as [string, ...string[]])], {
      required_error: 'role is required.',
    }),
    password: z.string().optional(),
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
