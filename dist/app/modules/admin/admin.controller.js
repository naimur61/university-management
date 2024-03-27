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
exports.AdminController = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const constants_1 = __importDefault(require("../../../constants/constants"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const http_status_1 = __importDefault(require("http-status"));
const admin_constant_1 = require("./admin.constant");
const admin_service_1 = require("./admin.service");
const getAllAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, admin_constant_1.adminFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, constants_1.default);
    const result = yield admin_service_1.AdminService.getAllAdminFromDB(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Admin retried successful.',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AdminID = req.params.id;
    const result = yield admin_service_1.AdminService.getSingleAdminFromDB(AdminID);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Admin retried successful.',
        data: result,
    });
}));
const deleteAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield admin_service_1.AdminService.deleteAdminFromDB(id);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Admin Deleted successful!',
        data: result,
    });
}));
const updateAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield admin_service_1.AdminService.updateAdminToDB(id, body);
    (0, sendResponse_1.default)(res, {
        statuscode: http_status_1.default.OK,
        success: true,
        message: 'Admin updated successful.',
        data: result,
    });
}));
exports.AdminController = {
    getAllAdmin,
    getSingleAdmin,
    deleteAdmin,
    updateAdmin,
};
