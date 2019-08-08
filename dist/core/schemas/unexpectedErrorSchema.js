"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'object',
    description: 'An unexpected error occured',
    properties: {
        code: { type: 'string', enum: ['UnexpectedError'] },
        message: { type: 'string' }
    }
};
//# sourceMappingURL=unexpectedErrorSchema.js.map