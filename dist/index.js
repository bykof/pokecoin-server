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
const fastify = require("fastify");
const oas = require("fastify-oas");
const mongoose = require("mongoose");
const pointOfView = require("point-of-view");
const ejs = require("ejs");
const routes_1 = require("./users/routes");
const routes_2 = require("./blockchain/routes");
const routes_3 = require("./wallet/routes");
const routes_4 = require("./cards/routes");
const routes_5 = require("./views/routes");
const swaggerConfig_1 = require("./config/swaggerConfig");
const Blockchain_1 = require("./blockchain/core/Blockchain");
const CardsAggregate_1 = require("./cards/core/CardsAggregate");
const CardPacksAggregate_1 = require("./cards/core/CardPacksAggregate");
const BaseJSON = require("./json/pokemonCards/Base.json");
const server = fastify({ logger: true });
const blockchain = Blockchain_1.default.getInstance();
const cardPacksAggregate = CardPacksAggregate_1.default.getInstance();
cardPacksAggregate.addCardPackFromJson('Base', BaseJSON);
const cardsAggregate = CardsAggregate_1.default.getInstance();
cardsAggregate.addCardsFromJson(BaseJSON);
// Env variables
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/pokecoin';
const PORT = parseInt(process.env.PORT) || 3000;
function startApplication() {
    return __awaiter(this, void 0, void 0, function* () {
        process.on('SIGTERM', () => process.exit());
        yield mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true });
        yield blockchain.setup();
        console.log(`Blockchain is setup with ${blockchain.chain.length} blocks`);
        server.register(pointOfView, {
            engine: {
                ejs: ejs
            },
            templates: './src/templates',
            includeViewExtension: true,
        });
        server.register(oas, swaggerConfig_1.default);
        server.register(routes_1.default, { prefix: '/auth' });
        server.register(routes_2.default, { prefix: '/blockchain' });
        server.register(routes_3.default, { prefix: '/wallet' });
        server.register(routes_4.default, { prefix: '/cards' });
        server.register(routes_5.default, { prefix: '/views' });
        server.ready((error) => {
            if (error)
                throw error;
            server.oas();
        });
        server.listen(PORT, '0.0.0.0', (error, address) => {
            if (error) {
                server.log.error(error);
                process.exit(1);
            }
            console.log('Server running:', address);
        });
    });
}
startApplication();
//# sourceMappingURL=index.js.map