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
const faculty_routes_1 = require("../modules/faculty/faculty.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const managementDepartment_routes_1 = require("../modules/managementDepartment/managementDepartment.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const router = express_1.default.Router();
const modulesRoute = [
    { path: '/user', router: user_routes_1.UserRoutes },
    { path: '/auth', router: auth_routes_1.AuthRoutes },
    { path: '/student', router: student_routes_1.StudentRoutes },
    { path: '/academic-semester', router: academicSemester_routes_1.SemesterRoutes },
    { path: '/academic-faculty', router: academicFaculty_routes_1.AcademicFacultyRoutes },
    { path: '/academic-department', router: academicDepartment_routes_1.DepartmentRoutes },
    { path: '/faculty', router: faculty_routes_1.FacultyRoutes },
    { path: '/admin', router: admin_routes_1.AdminRoutes },
    { path: '/managementDepartment', router: managementDepartment_routes_1.ManagementDepartmentRoutes },
];
modulesRoute.forEach(route => router.use(route.path, route.router));
exports.default = router;
