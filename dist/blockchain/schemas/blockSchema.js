"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = require("../../users/schemas/userSchema");
exports.default = {
    type: 'object',
    properties: {
        hash: { type: 'string' },
        previousHash: { type: 'string' },
        data: { type: 'string' },
        timestamp: { type: 'integer' },
        nonce: { type: 'integer' },
        foundByUser: userSchema_1.default,
    }
};
//# sourceMappingURL=blockSchema.js.map