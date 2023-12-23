import { Schema, model } from 'mongoose';
import { IAdmin, AdminModel } from './admin.interface';
import { BloodGroup, Gender } from './admin.constants';

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    gender: {
      type: String,
      enum: Gender,
      required: true,
    },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: BloodGroup,
    },
    profileImage: {
      type: String,
      // required: true, // Depending on your requirements
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
