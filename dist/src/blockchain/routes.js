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
const isAuthenticated_1 = require("../users/decorators/isAuthenticated");
const BlockchainController_1 = require("./controller/BlockchainController");
function routes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: "POST",
            url: "/blocks",
            schema: {
                tags: ["Blockchain"],
                body: { $ref: "AddBlockBody#" },
                response: {
                    200: { $ref: "AddBlockResponse#" },
                    400: { $ref: "AddBlockErrorResponse#" },
                    401: { $ref: "UnauthorizedError#" },
                    500: { $ref: "UnexpectedError#" },
                },
                security: [{ token: [] }],
            },
            preHandler: isAuthenticated_1.default,
            handler: BlockchainController_1.default.addBlock,
        });
        fastify.route({
            method: "GET",
            url: "/lastBlock",
            schema: {
                tags: ["Blockchain"],
                response: {
                    200: { $ref: "Block#" },
                    401: { $ref: "UnauthorizedError#" },
                    500: { $ref: "UnexpectedError#" },
                },
            },
            handler: BlockchainController_1.default.lastBlock,
        });
        fastify.route({
            method: "GET",
            url: "/currentDifficulty",
            schema: {
                tags: ["Blockchain"],
                response: {
                    200: { $ref: "CurrentDifficultyResponse#" },
                    500: { $ref: "UnexpectedError#" },
                },
            },
            handler: BlockchainController_1.default.currentDifficulty,
        });
    });
}
exports.default = routes;
//# sourceMappingURL=routes.js.map