"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const unexpectedErrorSchema_1 = require("../core/schemas/unexpectedErrorSchema");
const unauthorizedSchema_1 = require("../core/schemas/unauthorizedSchema");
const UserController_1 = require("./controller/UserController");
const isAuthenticated_1 = require("./decorators/isAuthenticated");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: 'POST',
            url: '/login',
            schema: {
                body: 'LoginBody#',
                response: {
                    200: 'LoginResponse#',
                    400: 'LoginErrorResponse#',
                    500: unexpectedErrorSchema_1.default,
                },
            },
            handler: UserController_1.default.login,
        });
        fastify.route({
            method: 'POST',
            url: '/register',
            schema: {
                body: 'RegisterBody#',
                response: {
                    200: 'RegisterResponse#',
                    400: 'RegisterErrorResponse#',
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
                    200: 'User#',
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
                body: 'ChangePasswordBody#',
                response: {
                    201: 'ChangePasswordResponse#',
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