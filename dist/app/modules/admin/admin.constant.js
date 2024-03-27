"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminFilterableFields = exports.adminSearchableFields = exports.Gender = exports.BloodGroup = void 0;
exports.BloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.Gender = ['male', 'female', 'other'];
exports.adminSearchableFields = [
    'id',
    'email',
    'contactNo',
    'bloodGroup',
    'name.firstName',
    'name.middleName',
    'name.lastName',
];
exports.adminFilterableFields = [
    'searchTerm',
    'id',
    'email',
    'contactNo',
    'bloodGroup',
];
