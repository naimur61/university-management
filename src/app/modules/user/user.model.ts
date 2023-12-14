import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { UserTypes } from './user.constants';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: UserTypes.Role,
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
