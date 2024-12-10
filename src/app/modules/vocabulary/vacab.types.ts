import { Types } from 'mongoose';

export type vocabTypes = {
  _id: Types.ObjectId;
  lessonId: Types.ObjectId;
  adminId: Types.ObjectId;
  word: string;
  pronunciation: string;
  meaning: string;
  useCase: string;
  createdAt: Date;
  updatedAt: Date;
};
