"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: "AddBlockBody",
    title: "AddBlockBody",
    description: "The body schema for adding a block",
    type: "object",
    required: ["previousHash", "data", "timestamp", "nonce"],
    properties: {
        previousHash: { type: "string" },
        data: { type: "string" },
        timestamp: { type: "integer" },
        nonce: { type: "integer" },
    },
};
//# sourceMappingURL=addBlockBody.js.map