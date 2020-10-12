"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const transactionSchema_1 = require("./transactionSchema");
const balanceResponse_1 = require("./balanceResponse");
function init(fastify) {
    fastify.addSchema(transactionSchema_1.default);
    fastify.addSchema(balanceResponse_1.default);
}
exports.init = init;
//# sourceMappingURL=index.js.map