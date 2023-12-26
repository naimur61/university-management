import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { UserTypes } from './user.constants';
import bcrypt from 'bcrypt';
import config from '../../../config';

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
    isNeedsChangePass: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Admin',
    // },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // hash Password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
