import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string'
  }).email(),
  password: z.string({
    required_error: 'Password is required'
  }),
  gender: z.number({
    invalid_type_error: 'Gender must be a number'
  }),
  role: z.enum(['USER', 'ADMIN'])
});
export type CreateUserInput = z.infer<typeof createUserSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const updateUserSchema = z.object({
  name: z.string().nonempty().optional(),
  password: z.string({
    required_error: 'Password is required'
  }).min(6).optional(),
  gender: z.number({
    invalid_type_error: 'Gender must be a number'
  }).optional()
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;