"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockSchema_1 = require("../../blockchain/schemas/blockSchema");
const userSchema_1 = require("../../users/schemas/userSchema");
exports.default = {
    type: 'object',
    properties: {
        amount: { type: 'integer' },
        timestamp: { type: 'integer' },
        rewardOfBlock: blockSchema_1.default,
        user: userSchema_1.default,
    },
};
//# sourceMappingURL=transactionSchema.js.map