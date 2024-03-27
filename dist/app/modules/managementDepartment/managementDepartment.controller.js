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
exports.ManagementDepartmentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const managementDepartment_service_1 = require("./managementDepartment.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const managementDepartment_constant_1 = require("./managementDepartment.constant");
const createDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ManagementDepartment = __rest(req.body, []);
    const result = yield managementDepartment_service_1.ManagementDepartmentService.createDepartmentToDB(ManagementDepartment);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Department Create Successful!',
        data: result,
    });
}));
const updateDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ManagementDepartment = __rest(req.body, []);
    const id = req.params.id;
    const result = yield managementDepartment_service_1.ManagementDepartmentService.updateDepartmentToDB(id, ManagementDepartment);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Department Create Successful!',
        data: result,
    });
}));
const getDepartments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, managementDepartment_constant_1.managementDepartmentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, managementDepartment_constant_1.managementDepartmentSearchableFields);
    const result = yield managementDepartment_service_1.ManagementDepartmentService.getDepartmentsFromDB(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Department retrieved successful!',
        meta: result.meta,
        data: result.data,
    });
}));
const deleteDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield managementDepartment_service_1.ManagementDepartmentService.deleteDepartmentFromDB(id);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Department Deleted Successful!',
        data: result,
    });
}));
const getSingleDepartment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield managementDepartment_service_1.ManagementDepartmentService.getSingleDepartment(id);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Department retrieve Successful!',
        data: result,
    });
}));
exports.ManagementDepartmentController = {
    createDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment,
    getSingleDepartment,
};
