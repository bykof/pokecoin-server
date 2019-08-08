"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockIsNotValidError_1 = require("../errors/BlockIsNotValidError");
const blockSchema_1 = require("./blockSchema");
const transactionSchema_1 = require("../../wallet/schemas/transactionSchema");
exports.bodySchema = {
    type: 'object',
    properties: {
        previousHash: { type: 'string' },
        data: { type: 'string' },
        timestamp: { type: 'integer' },
        nonce: { type: 'integer' },
    },
    required: ['previousHash', 'data', 'timestamp', 'nonce'],
};
exports.responseFailedSchema = {
    type: 'object',
    properties: {
        code: { type: 'string', enum: [BlockIsNotValidError_1.default.name,] },
        message: { type: 'string' },
        block: blockSchema_1.default,
        lastBlock: blockSchema_1.default,
    }
};
exports.responseSuccessfulSchema = {
    type: 'object',
    properties: {
        block: blockSchema_1.default,
        transaction: transactionSchema_1.default,
    }
};
//# sourceMappingURL=addBlockSchemas.js.map