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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = require("../../../errors/ApiError");
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    // Create and instance for user
    const user = new user_model_1.User();
    // check User exit
    const isUserExit = yield user.isUserExit(id);
    if (!isUserExit) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User dose not exit!');
    }
    //   Check password Matched
    if (isUserExit.password &&
        (yield user.isPasswordMatched(password, isUserExit.password))) {
        throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, 'Password is incorrect!');
    }
    const { id: usrId, role, isNeedsChangePass } = isUserExit;
    const accessToken = jwtHelper_1.jwtHelper.createToken({ id: usrId, role: role }, config_1.default.jwt.secrete, { expireIn: config_1.default.jwt.secrete_expire_in });
    const refreshToken = jwtHelper_1.jwtHelper.createToken({ id: usrId, role: role }, config_1.default.jwt.refresh_secrete, { expireIn: config_1.default.jwt.refresh_secrete_expire_in });
    return {
        accessToken,
        refreshToken,
        isNeedsChangePass,
    };
});
exports.AuthService = {
    userLogin,
};
