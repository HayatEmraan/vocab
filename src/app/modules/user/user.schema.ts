import { model, Schema } from 'mongoose';
import { userInPass, userTypes } from './user.types';
import bcrypt from 'bcrypt';
import { env } from '@config/index';

const userSchema = new Schema<userTypes, userInPass>(
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

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(env.SALT));
  next();
});

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.set('toObject', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.isPasswordMatch = async (plain: string, hash: string) => {
  return await bcrypt.compare(plain, hash);
};

const userModel = model<userTypes, userInPass>('user', userSchema);

export default userModel;
