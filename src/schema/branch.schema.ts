import { z } from 'zod';

export const createBranchSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),
  branchCode: z.string({
    required_error: 'Branch code is required',
    invalid_type_error: 'Branch code must be a string'
  }),
  address: z.string({
    required_error: 'Address is required',
    invalid_type_error: 'Address must be a string'
  })
});
export type createBranchInput = z.infer<typeof createBranchSchema>;

export const updateBranchSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string'
  }).nonempty().optional(),
  branchCode: z.string({
    invalid_type_error: 'Name must be a string'
  }).nonempty().optional(),
  address: z.string({
    invalid_type_error: 'Name must be a string'
  }).nonempty().optional()
});
export type updateBranchInput = z.infer<typeof updateBranchSchema>;