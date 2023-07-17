import { z } from 'zod';

export const RefreshTokenSchema = z.object({
  refreshToken: z.string()
});

export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;