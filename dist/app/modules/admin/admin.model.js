"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const admin_constant_1 = require("./admin.constant");
const adminSchema = new mongoose_1.Schema({
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
        enum: admin_constant_1.Gender,
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
        enum: admin_constant_1.BloodGroup,
    },
    profileImage: {
        type: String,
        // required: true, // Depending on your requirements
    },
    managementDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
