import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { userRole } from './user.constants';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: userRole,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser, UserModel>('User', userSchema);
