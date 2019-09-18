"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockIsNotValidError_1 = require("../errors/BlockIsNotValidError");
exports.default = {
    $id: 'AddBlockErrorResponse',
    title: 'AddBlockErrorResponse',
    description: 'The error response schema for failed block adding',
    type: 'object',
    properties: {
        code: { type: 'string', enum: [BlockIsNotValidError_1.default.name,] },
        message: { type: 'string' },
        block: 'Block#',
        lastBlock: 'Block#',
    }
};
//# sourceMappingURL=addBlockErrorResponse.js.map