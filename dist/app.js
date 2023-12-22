"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const http_status_1 = __importDefault(require("http-status"));
app.use((0, cors_1.default)());
// Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/', routes_1.default);
app.use(globalErrorHandler_1.default);
// Api Error Route Handler
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessage: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
