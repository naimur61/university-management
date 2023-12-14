import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentID = async (): Promise<number> => {
  const lastStudent = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  const newStudent = lastStudent ? parseInt(lastStudent.id.slice(-5)) + 1 : 1;

  return newStudent;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester,
): Promise<string> => {
  const newUser = await findLastStudentID();

  let incrementId = await newUser.toString().padStart(5, '0');

  incrementId = `${academicSemester.year.substring(2, 4)}${
    academicSemester.code
  }${incrementId}`;

  return incrementId;
};

const findLastFacultyID = async (): Promise<number> => {
  const lastFaculty = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  const newFaculty = lastFaculty ? parseInt(lastFaculty.id.slice(-5)) + 1 : 1;
  return newFaculty;
};

export const generateFacultyId = async () => {
  const newUser = await findLastFacultyID();

  let incrementId = await newUser.toString().padStart(5, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};
