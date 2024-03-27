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
exports.FacultyController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const constants_1 = __importDefault(require("../../../constants/constants"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const http_status_1 = __importDefault(require("http-status"));
const faculty_constants_1 = require("./faculty.constants");
const faculty_service_1 = require("./faculty.service");
const getAllFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, faculty_constants_1.facultyFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, constants_1.default);
    const result = yield faculty_service_1.FacultyService.getAllFacultyFromDB(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Faculty retried successful.',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const FacultyID = req.params.id;
    const result = yield faculty_service_1.FacultyService.getSingleFacultyFromDB(FacultyID);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Faculty retried successful.',
        data: result,
    });
}));
const deleteFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faculty_service_1.FacultyService.deleteFacultyFromDB(id);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Faculty Deleted successful!',
        data: result,
    });
}));
const updateFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield faculty_service_1.FacultyService.updateFacultyToDB(id, body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Faculty updated successful.',
        data: result,
    });
}));
exports.FacultyController = {
    getAllFaculty,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty,
};
