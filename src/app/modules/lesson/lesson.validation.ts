import { z } from 'zod';

export const lessonValidate = z.object({
  name: z.string(),
  number: z.number().int(),
  photoURL: z.string().url(),
  id: z.string().optional(),
  reason: z.string().optional(),
});

export const lessonUpdateValidate = z.object({
  name: z.string().optional(),
  number: z.number().int().optional(),
  reason: z.string().optional(),
  isCompleted: z.boolean().optional(),
});
