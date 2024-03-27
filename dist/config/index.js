"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    default_student_pass: process.env.DEFAULT_STUDENT_PASS,
    default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
    default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt: {
        secrete: process.env.JWT_SECRETE,
        secrete_expire_in: process.env.SECRETE_EXPIRES_IN,
        refresh_secrete: process.env.JWT_REFRESH_SECRETE,
        refresh_secrete_expire_in: process.env.REFRESH_SECRETE_EXPIRES_IN,
    },
};
