"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const notFoundSchema_1 = require("./notFoundSchema");
const pageParameterSchema_1 = require("./pageParameterSchema");
const unauthorizedSchema_1 = require("./unauthorizedSchema");
const unexpectedErrorSchema_1 = require("./unexpectedErrorSchema");
function init(fastify) {
    fastify.addSchema(notFoundSchema_1.default);
    fastify.addSchema(pageParameterSchema_1.default);
    fastify.addSchema(unauthorizedSchema_1.default);
    fastify.addSchema(unexpectedErrorSchema_1.default);
}
exports.init = init;
//# sourceMappingURL=index.js.map