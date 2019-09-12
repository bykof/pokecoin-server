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
const CardController_1 = require("./controller/CardController");
const buyDefaultPackageSchemas_1 = require("./schemas/buyDefaultPackageSchemas");
const getSchema_1 = require("./schemas/getSchema");
const listSchema_1 = require("./schemas/listSchema");
const packagesSchemas_1 = require("./schemas/packagesSchemas");
const userCardSchemas_1 = require("./schemas/userCardSchemas");
const notFoundSchema_1 = require("../core/schemas/notFoundSchema");
const pageParameterSchema_1 = require("../core/schemas/pageParameterSchema");
const CardPackController_1 = require("./controller/CardPackController");
const cardPackSchema_1 = require("./schemas/cardPackSchema");
const isAuthenticated_1 = require("../users/decorators/isAuthenticated");
const UserCardController_1 = require("./controller/UserCardController");
const unauthorizedSchema_1 = require("../core/schemas/unauthorizedSchema");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: 'GET',
            url: '/',
            schema: {
                querystring: pageParameterSchema_1.default,
                response: {
                    200: listSchema_1.responseSuccessfulSchema,
                    500: unexpectedErrorSchema_1.default,
                },
            },
            handler: CardController_1.default.list,
        });
        fastify.route({
            method: 'GET',
            url: '/:cardId',
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        cardId: {
                            type: 'string',
                            description: 'card id'
                        }
                    }
                },
                response: {
                    200: getSchema_1.responseSuccessfulSchema,
                    404: notFoundSchema_1.default,
                    500: unexpectedErrorSchema_1.default,
                },
            },
            handler: CardController_1.default.get,
        });
        fastify.route({
            method: 'GET',
            url: '/usercards',
            schema: {
                response: {
                    200: userCardSchemas_1.responseSuccessfulSchema,
                    401: unauthorizedSchema_1.default,
                    500: unexpectedErrorSchema_1.default,
                },
                security: [{ 'token': [] }],
            },
            preHandler: isAuthenticated_1.default,
            handler: UserCardController_1.default.getCards,
        });
        fastify.route({
            method: 'GET',
            url: '/packages',
            schema: {
                response: {
                    200: packagesSchemas_1.responseSuccessfulSchema,
                    500: unexpectedErrorSchema_1.default,
                },
            },
            handler: CardPackController_1.default.getCardPackages,
        });
        fastify.route({
            method: 'GET',
            url: '/packages/:cardPackName',
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        cardPackName: {
                            type: 'string',
                            description: 'name of the cardpack'
                        }
                    }
                },
                response: {
                    200: cardPackSchema_1.default,
                    404: notFoundSchema_1.default,
                    500: unexpectedErrorSchema_1.default,
                },
            },
            handler: CardPackController_1.default.getCardPack,
        });
        fastify.route({
            method: 'POST',
            url: '/packages/:cardPackName/buyDefaultPackage',
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        cardPackName: {
                            type: 'string',
                            description: 'name of the cardpack'
                        }
                    }
                },
                response: {
                    200: buyDefaultPackageSchemas_1.responseSuccessfulSchema,
                    404: notFoundSchema_1.default,
                    401: unauthorizedSchema_1.default,
                    500: unexpectedErrorSchema_1.default,
                },
                security: [{ 'token': [] }],
            },
            preHandler: isAuthenticated_1.default,
            handler: CardPackController_1.default.buyDefaultPackage,
        });
    });
}
exports.default = routes;
//# sourceMappingURL=routes.js.map