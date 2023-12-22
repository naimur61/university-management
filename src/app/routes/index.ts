import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { DepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';

const router = express.Router();

const modulesRoute = [
  { path: '/user', router: UserRoutes },
  { path: '/student', router: StudentRoutes },
  { path: '/academic-semester', router: SemesterRoutes },
  { path: '/academic-faculty', router: AcademicFacultyRoutes },
  { path: '/academic-department', router: DepartmentRoutes },
  { path: '/faculty', router: FacultyRoutes },
];

modulesRoute.forEach(route => router.use(route.path, route.router));

export default router;
