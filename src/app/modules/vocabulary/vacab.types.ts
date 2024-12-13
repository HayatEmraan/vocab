import { Types } from 'mongoose';

export type vocabTypes = {
  _id: Types.ObjectId;
  lessonId: Types.ObjectId;
  adminId: Types.ObjectId;
  word: string;
  reason: string;
  id: string;
  updatedId: Types.ObjectId;
  duration: number;
  pronunciation: string;
  meaning: string;
  useCase: string;
  createdAt: Date;
  updatedAt: Date;
};
