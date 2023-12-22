import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { FacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { DepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.routes';
import { Faculty } from '../modules/faculty/faculty.routes';

const router = express.Router();

const modulesRoute = [
  { path: '/user', router: UserRoutes },
  { path: '/student', router: StudentRoutes },
  { path: '/academic-semester', router: SemesterRoutes },
  { path: '/academic-faculty', router: FacultyRoutes },
  { path: '/academic-department', router: DepartmentRoutes },
  { path: '/faculty', router: Faculty },
];

modulesRoute.forEach(route => router.use(route.path, route.router));

export default router;
