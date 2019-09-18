"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: 'Block',
    title: 'Block',
    description: 'The block schema',
    type: 'object',
    properties: {
        hash: { type: 'string' },
        previousHash: { type: 'string' },
        data: { type: 'string' },
        timestamp: { type: 'integer' },
        nonce: { type: 'integer' },
        foundByUser: 'User#',
    }
};
//# sourceMappingURL=blockSchema.js.map