import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.routes';

const router = express.Router();

const modulesRoute = [
  { path: '/user', router: UserRoutes },
  { path: '/academic-semester', router: SemesterRoutes },
];

modulesRoute.forEach(route => router.use(route.path, route.router));

export default router;
