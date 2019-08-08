"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserNotFoundError_1 = require("../errors/UserNotFoundError");
const PasswordIncorrectError_1 = require("../errors/PasswordIncorrectError");
exports.bodySchema = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['username', 'password'],
};
exports.responseSuccessfulSchema = {
    type: 'object',
    properties: {
        token: { type: 'string' },
    }
};
exports.responseFailedSchema = {
    type: 'object',
    properties: {
        code: { type: 'string', enum: [UserNotFoundError_1.default.name, PasswordIncorrectError_1.default.name] },
        message: { type: 'string' },
        username: { type: 'string' },
    }
};
//# sourceMappingURL=loginSchemas.js.map