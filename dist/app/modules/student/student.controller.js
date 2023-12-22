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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const constants_1 = __importDefault(require("../../../constants/constants"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const student_constants_1 = require("./student.constants");
const getAllStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, student_constants_1.studentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, constants_1.default);
    const result = yield student_service_1.StudentService.getAllStudentFromDB(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Student retried successful.',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentID = req.params.id;
    const result = yield student_service_1.StudentService.getSingleStudentFromDB(studentID);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Student retried successful.',
        data: result,
    });
}));
const deleteStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_service_1.StudentService.deleteStudentFromDB(id);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Student Deleted successful!',
        data: result,
    });
}));
const updateStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield student_service_1.StudentService.updateStudentToDB(id, body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Student updated successful.',
        data: result,
    });
}));
exports.StudentController = {
    getAllStudent,
    getSingleStudent,
    deleteStudent,
    updateStudent,
};
