import { z } from 'zod';

export const createDivisionSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),
  branchId: z.number({
    required_error: 'Branch id is required',
    invalid_type_error: 'Branch id must be a number'
  })
});
export type createDivisionInput = z.infer<typeof createDivisionSchema>;

export const updateDivisionSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string'
  }).nonempty().optional(),
  branchId: z.number({
    invalid_type_error: 'Branch id must be a number'
  }).optional()
});
export type updateDivisionInput = z.infer<typeof updateDivisionSchema>;