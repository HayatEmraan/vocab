import { z } from 'zod';
import { Types } from 'mongoose';

export const historyValidate = z.object({
  userId: z.instanceof(Types.ObjectId),
  adminId: z.instanceof(Types.ObjectId),
  action: z.string(),
  status: z.string(),
});
