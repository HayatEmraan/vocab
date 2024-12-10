import { Types } from 'mongoose';

export type lessonTypes = {
  _id: Types.ObjectId;
  adminId: Types.ObjectId;
  name: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
};
