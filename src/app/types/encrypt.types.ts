import { Types } from 'mongoose';

export type encryptTypes = {
  email: string;
  _id: Types.ObjectId;
  role: string;
  isActive: boolean;
};
