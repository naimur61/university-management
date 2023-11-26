import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { FacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { DepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';

const router = express.Router();

const modulesRoute = [
  { path: '/user', router: UserRoutes },
  { path: '/academic-semester', router: SemesterRoutes },
  { path: '/academic-faculty', router: FacultyRoutes },
  { path: '/academic-department', router: DepartmentRoutes },
];

modulesRoute.forEach(route => router.use(route.path, route.router));

export default router;
