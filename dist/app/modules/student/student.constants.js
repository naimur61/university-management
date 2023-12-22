"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentFilterableFields = exports.studentSearchableFields = exports.Gender = exports.BloodGroup = void 0;
exports.BloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.Gender = ['male', 'female', 'other'];
exports.studentSearchableFields = [
    'id',
    'email',
    'contactNo',
    'bloodGroup',
    'name.firstName',
    'name.middleName',
    'name.lastName',
    // 'academicFaculty',
    // 'academicDepartment',
    // 'academicSemester',
];
exports.studentFilterableFields = [
    'searchTerm',
    'id',
    'email',
    'contactNo',
    'bloodGroup',
    'academicFaculty',
    'academicDepartment',
    'academicSemester',
];
