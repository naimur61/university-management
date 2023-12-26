import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { DepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

const modulesRoute = [
  { path: '/user', router: UserRoutes },
  { path: '/auth', router: AuthRoutes },
  { path: '/student', router: StudentRoutes },
  { path: '/academic-semester', router: SemesterRoutes },
  { path: '/academic-faculty', router: AcademicFacultyRoutes },
  { path: '/academic-department', router: DepartmentRoutes },
  { path: '/faculty', router: FacultyRoutes },
  { path: '/admin', router: AdminRoutes },
  { path: '/managementDepartment', router: ManagementDepartmentRoutes },
];

modulesRoute.forEach(route => router.use(route.path, route.router));

export default router;
