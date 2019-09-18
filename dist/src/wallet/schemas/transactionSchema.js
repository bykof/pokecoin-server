"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockSchema_1 = require("../../blockchain/schemas/blockSchema");
exports.default = {
    $id: 'Transaction',
    title: 'Transaction',
    description: 'The transaction schema',
    type: 'object',
    properties: {
        amount: { type: 'integer' },
        timestamp: { type: 'integer' },
        // Fix cause of circular import
        rewardOfBlock: blockSchema_1.default,
        user: 'User#',
    },
};
//# sourceMappingURL=transactionSchema.js.map