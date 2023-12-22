"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterFilterableFields = exports.academicSemesterSearchableFields = exports.AcademicSemesterTypes = void 0;
const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const Titles = ['Autumn', 'Summer', 'Fall'];
const Codes = ['01', '02', '03'];
exports.AcademicSemesterTypes = {
    Months,
    Titles,
    Codes,
};
exports.academicSemesterSearchableFields = ['title', 'code', 'year'];
exports.academicSemesterFilterableFields = [
    'searchTerm',
    'title',
    'year',
    'code',
];
