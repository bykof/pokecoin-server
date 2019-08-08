"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const unexpectedErrorSchema_1 = require("../core/schemas/unexpectedErrorSchema");
const unauthorizedSchema_1 = require("../core/schemas/unauthorizedSchema");
const UserController_1 = require("./controller/UserController");
const loginSchemas = require("./schemas/loginSchemas");
const registerSchemas = require("./schemas/registerSchemas");
const changePasswordSchemas = require("./schemas/changePasswordSchemas");
const isAuthenticated_1 = require("./decorators/isAuthenticated");
const userSchema_1 = require("./schemas/userSchema");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: 'POST',
            url: '/login',
            schema: {
                body: loginSchemas.bodySchema,
                response: {
                    200: loginSchemas.responseSuccessfulSchema,
                    400: loginSchemas.responseFailedSchema,
                    500: unexpectedErrorSchema_1.default,
                },
            },
            handler: UserController_1.default.login,
        });
        fastify.route({
            method: 'POST',
            url: '/register',
            schema: {
                body: registerSchemas.bodySchema,
                response: {
                    200: registerSchemas.responseSuccessfulSchema,
                    400: registerSchemas.responseFailedSchema,
                    500: unexpectedErrorSchema_1.default,
                }
            },
            handler: UserController_1.default.register,
        });
        fastify.route({
            method: 'GET',
            url: '/me',
            schema: {
                response: {
                    200: userSchema_1.default,
                    401: unauthorizedSchema_1.default,
                    500: unexpectedErrorSchema_1.default,
                },
                security: [{ 'token': [] }],
            },
            preHandler: isAuthenticated_1.default,
            handler: UserController_1.default.me,
        });
        fastify.route({
            method: 'POST',
            url: '/changePassword',
            schema: {
                body: changePasswordSchemas.bodySchema,
                response: {
                    201: changePasswordSchemas.responseSuccessfulSchema,
                    401: unauthorizedSchema_1.default,
                    500: unexpectedErrorSchema_1.default,
                },
                security: [{ 'token': [] }],
            },
            preHandler: isAuthenticated_1.default,
            handler: UserController_1.default.changePassword,
        });
    });
}
exports.default = routes;
//# sourceMappingURL=routes.js.map