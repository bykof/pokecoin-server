"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const pokemonCardSchema_1 = require("./pokemonCardSchema");
const cardPackSchema_1 = require("./cardPackSchema");
const userCardSchema_1 = require("./userCardSchema");
const userCardsResponse_1 = require("./userCardsResponse");
const packagesResponse_1 = require("./packagesResponse");
const buyDefaultPackageSchemaResponse_1 = require("./buyDefaultPackageSchemaResponse");
const cardResponse_1 = require("./cardResponse");
const cardsResponse_1 = require("./cardsResponse");
const currentPackageCostResponse_1 = require("./currentPackageCostResponse");
function init(fastify) {
    fastify.addSchema(pokemonCardSchema_1.default);
    fastify.addSchema(cardPackSchema_1.default);
    fastify.addSchema(userCardSchema_1.default);
    fastify.addSchema(buyDefaultPackageSchemaResponse_1.default);
    fastify.addSchema(packagesResponse_1.default);
    fastify.addSchema(userCardsResponse_1.default);
    fastify.addSchema(cardResponse_1.default);
    fastify.addSchema(cardsResponse_1.default);
    fastify.addSchema(currentPackageCostResponse_1.default);
}
exports.init = init;
//# sourceMappingURL=index.js.map