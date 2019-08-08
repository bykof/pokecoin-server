"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSuccessfulSchema = {
    type: 'object',
    description: 'Successfully changed password',
};
exports.bodySchema = {
    type: 'object',
    properties: {
        'password': { type: 'string' },
        'newPassword': { type: 'string' },
    },
    required: ['password', 'newPassword'],
};
//# sourceMappingURL=changePasswordSchemas.js.map