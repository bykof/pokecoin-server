"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const blockSchema_1 = require("./blockSchema");
const addBlockBody_1 = require("./addBlockBody");
const addBlockResponse_1 = require("./addBlockResponse");
const addBlockErrorResponse_1 = require("./addBlockErrorResponse");
const currentDifficultyResponse_1 = require("./currentDifficultyResponse");
function init(fastify) {
    fastify.addSchema(blockSchema_1.default);
    fastify.addSchema(addBlockBody_1.default);
    fastify.addSchema(addBlockResponse_1.default);
    fastify.addSchema(addBlockErrorResponse_1.default);
    fastify.addSchema(currentDifficultyResponse_1.default);
}
exports.init = init;
//# sourceMappingURL=index.js.map