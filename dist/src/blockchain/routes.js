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
const isAuthenticated_1 = require("../users/decorators/isAuthenticated");
const unauthorizedSchema_1 = require("../core/schemas/unauthorizedSchema");
const BlockchainController_1 = require("./controller/BlockchainController");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: 'POST',
            url: '/blocks',
            schema: {
                tags: ['Blockchain'],
                body: 'AddBlockBody#',
                response: {
                    200: 'AddBlockResponse#',
                    400: 'AddBlockErrorResponse#',
                    401: unauthorizedSchema_1.default,
                    500: unexpectedErrorSchema_1.default,
                },
                security: [{ 'token': [] }],
            },
            preHandler: isAuthenticated_1.default,
            handler: BlockchainController_1.default.addBlock,
        });
        fastify.route({
            method: 'GET',
            url: '/lastBlock',
            schema: {
                tags: ['Blockchain'],
                response: {
                    200: 'Block#',
                    401: unauthorizedSchema_1.default,
                    500: unexpectedErrorSchema_1.default,
                },
            },
            handler: BlockchainController_1.default.lastBlock,
        });
        fastify.route({
            method: 'GET',
            url: '/currentDifficulty',
            schema: {
                tags: ['Blockchain'],
                response: {
                    200: 'CurrentDifficultyResponse#',
                    500: unexpectedErrorSchema_1.default,
                },
            },
            handler: BlockchainController_1.default.currentDifficulty,
        });
    });
}
exports.default = routes;
//# sourceMappingURL=routes.js.map