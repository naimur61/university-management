"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyFilterableFields = exports.facultySearchableFields = exports.Gender = exports.BloodGroup = void 0;
exports.BloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.Gender = ['male', 'female', 'other'];
exports.facultySearchableFields = [
    'id',
    'email',
    'contactNo',
    'bloodGroup',
    'name.firstName',
    'name.middleName',
    'name.lastName',
];
exports.facultyFilterableFields = [
    'searchTerm',
    'id',
    'email',
    'contactNo',
    'bloodGroup',
];
