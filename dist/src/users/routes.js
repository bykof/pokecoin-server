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
const UserController_1 = require("./controller/UserController");
const isAuthenticated_1 = require("./decorators/isAuthenticated");
function routes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: "POST",
            url: "/login",
            schema: {
                tags: ["Users"],
                body: { $ref: "LoginBody#" },
                response: {
                    200: { $ref: "LoginResponse#" },
                    400: { $ref: "LoginErrorResponse#" },
                    500: { $ref: "UnexpectedError#" },
                },
            },
            handler: UserController_1.default.login,
        });
        fastify.route({
            method: "POST",
            url: "/register",
            schema: {
                tags: ["Users"],
                body: { $ref: "RegisterBody#" },
                response: {
                    200: { $ref: "RegisterResponse#" },
                    400: { $ref: "RegisterErrorResponse#" },
                    500: { $ref: "UnexpectedError#" },
                },
            },
            handler: UserController_1.default.register,
        });
        fastify.route({
            method: "GET",
            url: "/me",
            schema: {
                tags: ["Users"],
                response: {
                    200: { $ref: "User#" },
                    401: { $ref: "UnauthorizedError#" },
                    500: { $ref: "UnexpectedError#" },
                },
                security: [{ token: [] }],
            },
            preHandler: isAuthenticated_1.default,
            handler: UserController_1.default.me,
        });
        fastify.route({
            method: "POST",
            url: "/changePassword",
            schema: {
                tags: ["Users"],
                body: { $ref: "ChangePasswordBody#" },
                response: {
                    201: { $ref: "ChangePasswordResponse#" },
                    401: { $ref: "UnauthorizedError#" },
                    500: { $ref: "UnexpectedError#" },
                },
                security: [{ token: [] }],
            },
            preHandler: isAuthenticated_1.default,
            handler: UserController_1.default.changePassword,
        });
    });
}
exports.default = routes;
//# sourceMappingURL=routes.js.map