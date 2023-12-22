"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const academicSemester_routes_1 = require("../modules/academicSemester/academicSemester.routes");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const student_routes_1 = require("../modules/student/student.routes");
const router = express_1.default.Router();
const modulesRoute = [
    { path: '/user', router: user_routes_1.UserRoutes },
    { path: '/student', router: student_routes_1.StudentRoutes },
    { path: '/academic-semester', router: academicSemester_routes_1.SemesterRoutes },
    { path: '/academic-faculty', router: academicFaculty_routes_1.FacultyRoutes },
    { path: '/academic-department', router: academicDepartment_routes_1.DepartmentRoutes },
];
modulesRoute.forEach(route => router.use(route.path, route.router));
exports.default = router;
