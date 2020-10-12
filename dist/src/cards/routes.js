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
const CardController_1 = require("./controller/CardController");
const CardPackController_1 = require("./controller/CardPackController");
const isAuthenticated_1 = require("../users/decorators/isAuthenticated");
const UserCardController_1 = require("./controller/UserCardController");
function routes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: 'GET',
            url: '/',
            schema: {
                tags: ['Cards'],
                querystring: { $ref: 'PageParameter#' },
                response: {
                    200: { $ref: 'CardResponse#' },
                    500: { $ref: 'UnexpectedError#' },
                },
            },
            handler: CardController_1.default.list,
        });
        fastify.route({
            method: 'GET',
            url: '/:cardId',
            schema: {
                tags: ['Cards'],
                params: {
                    type: 'object',
                    properties: {
                        cardId: {
                            type: 'string',
                            description: 'card id',
                        },
                    },
                },
                response: {
                    200: { $ref: 'CardResponse#' },
                    404: { $ref: 'NotFoundError#' },
                    500: { $ref: 'UnexpectedError#' },
                },
            },
            handler: CardController_1.default.get,
        });
        fastify.route({
            method: 'GET',
            url: '/usercards',
            schema: {
                tags: ['Cards'],
                response: {
                    200: { $ref: 'UserCardResponse#' },
                    401: { $ref: 'UnauthorizedError#' },
                    500: { $ref: 'UnexpectedError#' },
                },
                security: [{ token: [] }],
            },
            preHandler: isAuthenticated_1.default,
            handler: UserCardController_1.default.getCards,
        });
        fastify.route({
            method: 'GET',
            url: '/packages',
            schema: {
                tags: ['Cards'],
                response: {
                    200: { $ref: 'PackagesResponse#' },
                    500: { $ref: 'UnexpectedError#' },
                },
            },
            handler: CardPackController_1.default.getCardPackages,
        });
        fastify.route({
            method: 'GET',
            url: '/packages/:cardPackName',
            schema: {
                tags: ['Cards'],
                params: {
                    type: 'object',
                    properties: {
                        cardPackName: {
                            type: 'string',
                            description: 'name of the cardpack',
                        },
                    },
                },
                response: {
                    200: { $ref: 'CardPack#' },
                    404: { $ref: 'NotFoundError#' },
                    500: { $ref: 'UnexpectedError#' },
                },
            },
            handler: CardPackController_1.default.getCardPack,
        });
        fastify.route({
            method: 'GET',
            url: '/packages/:cardPackName/buyDefaultPackage',
            schema: {
                tags: ['Cards'],
                params: {
                    type: 'object',
                    properties: {
                        cardPackName: {
                            type: 'string',
                            description: 'name of the cardpack',
                        },
                    },
                },
                response: {
                    200: { $ref: 'BuyDefaultPackageSchemaResponse#' },
                    404: { $ref: 'NotFoundError#' },
                    401: { $ref: 'UnauthorizedError#' },
                    500: { $ref: 'UnexpectedError#' },
                },
                security: [{ token: [] }],
            },
            preHandler: isAuthenticated_1.default,
            handler: CardPackController_1.default.buyDefaultPackage,
        });
        fastify.route({
            method: 'GET',
            url: '/packages/currentPackageCost',
            schema: {
                tags: ['Cards'],
                response: {
                    200: { $ref: 'BuyDefaultPackageSchemaResponse#' },
                },
            },
            handler: CardPackController_1.default.currentPackageCost,
        });
    });
}
exports.default = routes;
//# sourceMappingURL=routes.js.map