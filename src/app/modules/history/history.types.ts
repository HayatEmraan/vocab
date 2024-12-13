import { Types } from 'mongoose';

export type historyTypes = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  adminId: Types.ObjectId;
  reason: string;
  isActive: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type lessonHistoryTypes = {
  userId: Types.ObjectId;
  lessonId: Types.ObjectId;
};

export type vocabHistoryTypes = {
  userId: Types.ObjectId;
  vocabId: Types.ObjectId;
  lessonId: Types.ObjectId;
};
