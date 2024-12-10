import { Types } from 'mongoose';

export type historyTypes = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  adminId: Types.ObjectId;
  action: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
