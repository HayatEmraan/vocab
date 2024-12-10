import { Types } from 'mongoose';

export type userTypes = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  photoURL?: string;
  isActive: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type userLoginTypes = {
  email: string;
  password: string;
};
