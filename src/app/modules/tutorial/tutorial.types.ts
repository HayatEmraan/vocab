import { Types } from 'mongoose';

export type tutorialTypes = {
  _id: string;
  url: string;
  adminId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
