import { z } from 'zod';

export const userValidate = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  photoURL: z.string().url().optional(),
  isActive: z.boolean(),
  role: z.string(),
});

export const userUpdateValidate = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  photoURL: z.string().url().optional(),
  isActive: z.boolean().optional(),
  role: z.string().optional(),
});

export const userLoginValidate = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
