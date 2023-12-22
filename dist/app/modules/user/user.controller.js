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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const constants_1 = __importDefault(require("../../../constants/constants"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const user_constants_1 = require("./user.constants");
const createStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { student } = _a, userData = __rest(_a, ["student"]);
    const result = yield user_service_1.UserService.createStudentToDB(student, userData);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'User successfully created!',
        data: result,
    });
}));
const getUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, user_constants_1.userFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, constants_1.default);
    const result = yield user_service_1.UserService.getUserFromDB(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'User retried successful.',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.params.id;
    const result = yield user_service_1.UserService.getSingleUserFromDB(userID);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'User retried successful.',
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.deleteUserFromDB(id);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'User Deleted successful!',
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield user_service_1.UserService.updateUserToDB(id, body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'User update successful.',
        data: result,
    });
}));
exports.UserController = {
    createStudent,
    getUser,
    getSingleUser,
    deleteUser,
    updateUser,
};
