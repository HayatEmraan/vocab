import { Types } from 'mongoose';

export type lessonTypes = {
  _id: Types.ObjectId;
  adminId: Types.ObjectId;
  updatedId: Types.ObjectId;
  reason: string;
  name: string;
  isCompleted: boolean;
  number: number;
  createdAt: Date;
  updatedAt: Date;
};
