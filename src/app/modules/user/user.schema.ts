import { model, Schema } from 'mongoose';
import { userTypes } from './user.types';

const userSchema = new Schema<userTypes>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = model<userTypes>('User', userSchema);

export default userModel;
