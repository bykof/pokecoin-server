"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaError_1 = require("../../core/errors/SchemaError");
class BlockIsNotValidError extends SchemaError_1.default {
    constructor(block, lastBlock) {
        super(BlockIsNotValidError.name, `Block with hash ${block.hash} is not valid`);
        this.block = block;
        this.lastBlock = lastBlock;
    }
}
exports.default = BlockIsNotValidError;
//# sourceMappingURL=BlockIsNotValidError.js.map