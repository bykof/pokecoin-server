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
const isAuthenticated_1 = require("../users/decorators/isAuthenticated");
const unauthorizedSchema_1 = require("../core/schemas/unauthorizedSchema");
const balanceSchemas = require("./schemas/balanceSchemas");
const WalletController_1 = require("./controllers/WalletController");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: 'GET',
            url: '/balance',
            schema: {
                response: {
                    200: balanceSchemas.responseSuccessfulSchema,
                    401: unauthorizedSchema_1.default,
                    500: unexpectedErrorSchema_1.default,
                },
                security: [{ 'token': [] }],
            },
            preHandler: isAuthenticated_1.default,
            handler: WalletController_1.default.balance,
        });
    });
}
exports.default = routes;
//# sourceMappingURL=routes.js.map