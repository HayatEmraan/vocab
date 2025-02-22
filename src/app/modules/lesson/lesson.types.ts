import { Types } from 'mongoose';

export type lessonTypes = {
  _id: Types.ObjectId;
  adminId: Types.ObjectId;
  updatedId: Types.ObjectId;
  id: string;
  reason: string;
  name: string;
  photoURL: string;
  isCompleted: boolean;
  number: number;
  createdAt: Date;
  updatedAt: Date;
};
