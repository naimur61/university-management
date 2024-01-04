import { Schema, model } from 'mongoose';
import { IUser, IUserMethod, UserModel } from './user.interface';
import { UserTypes } from './user.constants';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethod>(
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
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.isUserExit = async function (
  id: string,
): Promise<Partial<IUser> | null> {
  return User.findOne(
    { id },
    { id: 1, password: 1, role: 1, isNeedsChangePass: 1 },
  ).lean();
};

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  // hash Password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
