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
exports.FacultyService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const ApiError_1 = require("../../../errors/ApiError");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const faculty_constants_1 = require("./faculty.constants");
const faculty_model_1 = require("./faculty.model");
const getAllFacultyFromDB = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy, sortOrder, limit, skip, page } = paginationHelpers_1.HelperPagination.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: faculty_constants_1.facultySearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([key, value]) => ({
                [key]: value,
            })),
        });
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield faculty_model_1.Faculty.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield faculty_model_1.Faculty.countDocuments(whereCondition);
    return {
        meta: {
            total,
            limit,
            page,
        },
        data: result,
    };
});
const getSingleFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findById(id);
    return result;
});
const deleteFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    const session = yield (0, mongoose_1.startSession)();
    try {
        yield session.startTransaction();
        const user = yield user_model_1.User.findOneAndDelete({ id });
        if (!user) {
            throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'User Deleted failed!');
        }
        const faculty = yield faculty_model_1.Faculty.findOneAndDelete({ id });
        if (!faculty) {
            throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Faculty Deleted failed!');
        }
        result = faculty;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return result;
});
const updateFacultyToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload, FacultyData = __rest(payload, ["name"]);
    const ifExits = yield faculty_model_1.Faculty.findOne({ id });
    if (!ifExits) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Faculty Not Found!');
    }
    const updatedFacultyData = Object.assign({}, FacultyData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedFacultyData[nameKey] = name[key];
        });
    }
    const result = yield faculty_model_1.Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
        new: true,
    });
    return result;
});
exports.FacultyService = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    deleteFacultyFromDB,
    updateFacultyToDB,
};
