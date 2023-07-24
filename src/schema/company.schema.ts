import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),
  businessCode: z.string({
    required_error: 'BusinessCode is required',
    invalid_type_error: 'BusinessCode must be a string'
  }).max(255)
});
export type createCompanyInput = z.infer<typeof createCompanySchema>;