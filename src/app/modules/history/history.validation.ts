import { z } from 'zod';

export const historyValidate = z.object({
  userId: z.string(),
  adminId: z.string(),
  action: z.string(),
  status: z.string(),
});
