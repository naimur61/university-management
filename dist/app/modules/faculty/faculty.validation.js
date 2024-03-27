"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const student_constants_1 = require("../student/student.constants");
const updateFacultyZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .object({
            firstName: zod_1.default.string().optional(),
            middleName: zod_1.default.string().optional(),
            lastName: zod_1.default.string().optional(),
        })
            .optional(),
        gender: zod_1.default.enum([...student_constants_1.Gender]).optional(),
        dateOfBirth: zod_1.default.string().optional(),
        email: zod_1.default.string().optional(),
        contactNo: zod_1.default.string().optional(),
        emergencyContactNo: zod_1.default.string().optional(),
        presentAddress: zod_1.default.string().optional(),
        permanentAddress: zod_1.default.string().optional(),
        bloodGroup: zod_1.default.enum([...student_constants_1.BloodGroup]).optional(),
        profileImage: zod_1.default.string().optional(),
        designation: zod_1.default.string().optional(),
        academicDepartment: zod_1.default.string().optional(),
        academicFaculty: zod_1.default.string().optional(),
    }),
});
exports.FacultyValidation = {
    updateFacultyZodSchema,
};
