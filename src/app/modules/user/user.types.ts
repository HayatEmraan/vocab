import { Model, Types } from 'mongoose';

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

export interface userInPass extends Model<userTypes> {
  isPasswordMatch(plainText: string, hashPassword: string): Promise<boolean>;
}

export type userLoginTypes = {
  email: string;
  password: string;
};

export type userReason = {
  adminId: Types.ObjectId;
  reason: string;
};
