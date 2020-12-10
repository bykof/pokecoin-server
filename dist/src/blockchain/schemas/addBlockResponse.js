"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: "AddBlockResponse",
    title: "AddBlockResponse",
    description: "The add block response schema if block was added",
    type: "object",
    properties: {
        block: { $ref: "Block#" },
        transaction: { $ref: "Transaction#" },
    },
};
//# sourceMappingURL=addBlockResponse.js.map