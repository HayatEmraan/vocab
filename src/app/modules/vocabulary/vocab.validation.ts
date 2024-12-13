import { z } from 'zod';

export const vocabValidate = z.object({
  lessonId: z.string(),
  word: z.string(),
  pronunciation: z.string(),
  meaning: z.string(),
  useCase: z.string(),
  id: z.string().optional(),
});

export const vocabUpdateValidate = z.object({
  word: z.string().optional(),
  pronunciation: z.string().optional(),
  meaning: z.string().optional(),
  useCase: z.string().optional(),
});
