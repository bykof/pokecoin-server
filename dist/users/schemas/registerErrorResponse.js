"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: 'RegisterErrorResponse',
    title: 'RegisterErrorResponse',
    description: 'The error when register failed',
    type: 'object',
    properties: {
        code: { type: 'string', enum: ['UserAlreadyExists'] },
        message: { type: 'string' },
        username: { type: 'string' },
    }
};
//# sourceMappingURL=registerErrorResponse.js.map