"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidation = void 0;
const zod_1 = require("zod");
const student_constants_1 = require("../student/student.constants");
const updateStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        gender: zod_1.z.enum([...student_constants_1.Gender]).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.enum([...student_constants_1.BloodGroup]).optional(),
        guardian: zod_1.z
            .object({
            fatherName: zod_1.z.string().optional(),
            fatherOccupation: zod_1.z.string().optional(),
            fatherContactNo: zod_1.z.string().optional(),
            motherName: zod_1.z.string().optional(),
            motherOccupation: zod_1.z.string().optional(),
            motherContactNo: zod_1.z.string().optional(),
            address: zod_1.z.string().optional(),
        })
            .optional(),
        localGuardian: zod_1.z
            .object({
            name: zod_1.z.string().optional(),
            occupation: zod_1.z.string().optional(),
            contactNo: zod_1.z.string().optional(),
            address: zod_1.z.string().optional(),
        })
            .optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.StudentValidation = { updateStudentZodSchema };
