"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        statuscode: res.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null,
        data: data.data || null,
    };
    res.status(data.statuscode).json(responseData);
};
exports.default = sendResponse;
