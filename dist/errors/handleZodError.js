"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const errors = error.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = 500;
    return {
        statusCode,
        message: 'validation error',
        errorMessage: errors,
    };
};
exports.default = handleZodError;
