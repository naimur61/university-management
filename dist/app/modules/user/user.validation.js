"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("./user.constants");
const student_constants_1 = require("../student/student.constants");
const createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({ required_error: 'First Name is required!' }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({ required_error: 'First Name is required!' }),
            }),
            gender: zod_1.z.enum([...student_constants_1.Gender], {
                required_error: 'Gender is required!',
            }),
            dateOfBirth: zod_1.z.string({ required_error: 'Date of Birth is required!' }),
            email: zod_1.z.string({ required_error: 'Email is required!' }),
            contactNo: zod_1.z.string({ required_error: 'Contact number is required!' }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency Contact number is required!',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required!',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required!',
            }),
            bloodGroup: zod_1.z.enum([...student_constants_1.BloodGroup]),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({ required_error: 'Father name is required!' }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'Father occupation name is required!',
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: 'Father contact number is required!',
                }),
                motherName: zod_1.z.string({ required_error: 'Mother name is required!' }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother occupation name is required!',
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'Mother contact number is required!',
                }),
                address: zod_1.z.string({ required_error: 'Address is required!' }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({ required_error: 'Local Guardian name is required!' }),
                occupation: zod_1.z.string({
                    required_error: 'Local Guardian occupation is required!',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Local Guardian contact number is required!',
                }),
                address: zod_1.z.string({
                    required_error: 'Local Guardian address is required!',
                }),
            }),
            profileImage: zod_1.z.string().optional(),
            academicSemester: zod_1.z.string({
                required_error: 'Academic semester is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
        }),
    }),
});
const createFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        faculty: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({ required_error: 'First Name is required!' }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({ required_error: 'First Name is required!' }),
            }),
            gender: zod_1.z.enum([...student_constants_1.Gender], {
                required_error: 'Gender is required!',
            }),
            dateOfBirth: zod_1.z.string({ required_error: 'Date of Birth is required!' }),
            email: zod_1.z.string({ required_error: 'Email is required!' }),
            contactNo: zod_1.z.string({ required_error: 'Contact number is required!' }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency Contact number is required!',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required!',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required!',
            }),
            bloodGroup: zod_1.z.enum([...student_constants_1.BloodGroup]),
            profileImage: zod_1.z.string().optional(),
            designation: zod_1.z.string({
                required_error: 'Designation is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
        }),
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        faculty: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({ required_error: 'First Name is required!' }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({ required_error: 'First Name is required!' }),
            }),
            gender: zod_1.z.enum([...student_constants_1.Gender], {
                required_error: 'Gender is required!',
            }),
            dateOfBirth: zod_1.z.string({ required_error: 'Date of Birth is required!' }),
            email: zod_1.z.string({ required_error: 'Email is required!' }),
            contactNo: zod_1.z.string({ required_error: 'Contact number is required!' }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency Contact number is required!',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required!',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required!',
            }),
            bloodGroup: zod_1.z.enum([...student_constants_1.BloodGroup]),
            profileImage: zod_1.z.string().optional(),
            designation: zod_1.z.string({
                required_error: 'Designation is required',
            }),
            managementDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
            }),
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([...user_constants_1.UserTypes.Role], {
            required_error: 'role is required.',
        }),
        password: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createStudentZodSchema,
    updateUserZodSchema,
    createFacultyZodSchema,
    createAdminZodSchema,
};
