"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.generateFacultyId = exports.generateStudentId = void 0;
const user_model_1 = require("./user.model");
const findLastStudentID = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({ role: 'student' }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    const newStudent = lastStudent ? parseInt(lastStudent.id.slice(-5)) + 1 : 1;
    return newStudent;
});
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield findLastStudentID();
    let incrementId = yield newUser.toString().padStart(5, '0');
    incrementId = `${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year.substring(2, 4)}${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code}${incrementId}`;
    return incrementId;
});
exports.generateStudentId = generateStudentId;
const findLastFacultyID = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    const newFaculty = lastFaculty ? parseInt(lastFaculty.id.slice(-5)) + 1 : 1;
    return newFaculty;
});
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield findLastFacultyID();
    let incrementId = yield newUser.toString().padStart(5, '0');
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.generateFacultyId = generateFacultyId;
const findLastAdminID = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    const newFaculty = lastFaculty ? parseInt(lastFaculty.id.slice(-5)) + 1 : 1;
    return newFaculty;
});
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield findLastAdminID();
    let incrementId = yield newUser.toString().padStart(5, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generateAdminId = generateAdminId;
