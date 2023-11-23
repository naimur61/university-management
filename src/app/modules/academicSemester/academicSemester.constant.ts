import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemester.interface';

const Months: IAcademicSemesterMonths[] = [
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

const Titles: IAcademicSemesterTitles[] = ['Autumn', 'Summer', 'Fall'];
const Codes: IAcademicSemesterCodes[] = ['01', '02', '03'];

export const AcademicSemesterTypes = {
  Months,
  Titles,
  Codes,
};

export const academicSemesterSearchableFields = ['title', 'code', 'year'];

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'year',
  'code',
];
