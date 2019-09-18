"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserNotFoundError_1 = require("../errors/UserNotFoundError");
const PasswordIncorrectError_1 = require("../errors/PasswordIncorrectError");
exports.default = {
    $id: 'LoginErrorResponse',
    title: 'LoginErrorResponse',
    description: 'The error schema if login failed',
    type: 'object',
    properties: {
        code: { type: 'string', enum: [UserNotFoundError_1.default.name, PasswordIncorrectError_1.default.name] },
        message: { type: 'string' },
        username: { type: 'string' },
    }
};
//# sourceMappingURL=loginErrorResponse.js.map