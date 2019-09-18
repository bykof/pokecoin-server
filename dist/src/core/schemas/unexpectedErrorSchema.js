"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: 'UnexpectedError',
    title: 'UnexpectedError',
    description: 'An unexpected error occured',
    type: 'object',
    properties: {
        code: { type: 'string', enum: ['UnexpectedError'] },
        message: { type: 'string' }
    }
};
//# sourceMappingURL=unexpectedErrorSchema.js.map