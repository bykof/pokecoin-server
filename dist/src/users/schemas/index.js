"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = require("./userSchema");
const changePasswordBody_1 = require("./changePasswordBody");
const changePasswordResponse_1 = require("./changePasswordResponse");
const loginBody_1 = require("./loginBody");
const loginErrorResponse_1 = require("./loginErrorResponse");
const loginResponse_1 = require("./loginResponse");
const registerBody_1 = require("./registerBody");
const registerResponse_1 = require("./registerResponse");
const registerErrorResponse_1 = require("./registerErrorResponse");
function init(fastify) {
    fastify.addSchema(userSchema_1.default);
    fastify.addSchema(changePasswordBody_1.default);
    fastify.addSchema(changePasswordResponse_1.default);
    fastify.addSchema(loginBody_1.default);
    fastify.addSchema(loginResponse_1.default);
    fastify.addSchema(loginErrorResponse_1.default);
    fastify.addSchema(registerBody_1.default);
    fastify.addSchema(registerResponse_1.default);
    fastify.addSchema(registerErrorResponse_1.default);
}
exports.init = init;
//# sourceMappingURL=index.js.map