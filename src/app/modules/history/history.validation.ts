import { z } from 'zod';

export const historyValidate = z.object({
  userId: z.string(),
  adminId: z.string(),
  action: z.string(),
  status: z.string(),
});

export const vocabHistoryValidate = z.object({
  vocabId: z.string(),
});

export const lessonHistoryValidate = z.object({
  lessonId: z.string(),
});
