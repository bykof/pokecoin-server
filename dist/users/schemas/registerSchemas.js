"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        username: { type: 'string' },
    }
};
exports.responseFailedSchema = {
    type: 'object',
    properties: {
        code: { type: 'string', enum: ['UserAlreadyExists'] },
        message: { type: 'string' },
        username: { type: 'string' },
    }
};
//# sourceMappingURL=registerSchemas.js.map