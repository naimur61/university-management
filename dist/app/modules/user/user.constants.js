"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypes = exports.userFilterableFields = exports.userSearchableFields = void 0;
exports.userSearchableFields = ['role'];
exports.userFilterableFields = ['searchTerm', 'role'];
const Role = ['student', 'admin', 'faculty'];
exports.UserTypes = {
    Role,
};
