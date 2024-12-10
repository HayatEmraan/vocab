import { z } from 'zod';
import { Types } from 'mongoose';

export const vocabValidate = z.object({
  lessonId: z.instanceof(Types.ObjectId),
  adminId: z.instanceof(Types.ObjectId),
  word: z.string(),
  pronunciation: z.string(),
  meaning: z.string(),
  useCase: z.string(),
});

export const vocabUpdateValidate = z.object({
  word: z.string().optional(),
  pronunciation: z.string().optional(),
  meaning: z.string().optional(),
  useCase: z.string().optional(),
});
