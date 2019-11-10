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
const fastify = require("fastify");
const oas = require("fastify-oas");
const fastifyCORS = require("fastify-cors");
const mongoose = require("mongoose");
const pointOfView = require("point-of-view");
const ejs = require("ejs");
const env_1 = require("./env");
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
const UserSetup_1 = require("./users/core/UserSetup");
const schemas_1 = require("./users/schemas");
const schemas_2 = require("./cards/schemas");
const schemas_3 = require("./blockchain/schemas");
const schemas_4 = require("./wallet/schemas");
const server = fastify({ logger: true });
const blockchain = Blockchain_1.default.getInstance();
const cardPacksAggregate = CardPacksAggregate_1.default.getInstance();
cardPacksAggregate.addCardPackFromJson('Base', BaseJSON);
const cardsAggregate = CardsAggregate_1.default.getInstance();
cardsAggregate.addCardsFromJson(BaseJSON);
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect(env_1.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    });
}
exports.setupDatabase = setupDatabase;
function startApplication() {
    return __awaiter(this, void 0, void 0, function* () {
        process.on('SIGTERM', () => process.exit());
        yield setupDatabase();
        yield UserSetup_1.default.setup();
        yield blockchain.setup();
        console.log(`Blockchain is setup with ${blockchain.chain.length} blocks`);
        schemas_1.init(server);
        schemas_2.init(server);
        schemas_4.init(server);
        schemas_3.init(server);
        server.register(fastifyCORS, {
            origin: '*',
            credentials: true,
            preflightContinue: true,
        });
        server.register(pointOfView, {
            engine: {
                ejs: ejs
            },
            templates: './src/templates',
            includeViewExtension: true,
        });
        server.register(oas, swaggerConfig_1.default).register(routes_1.default, { prefix: '/auth' }).register(routes_2.default, { prefix: '/blockchain' }).register(routes_3.default, { prefix: '/wallet' }).register(routes_4.default, { prefix: '/cards' }).register(routes_5.default, { prefix: '/views' }).after((error) => { if (error) {
            console.log(error);
        } });
        server.ready((err) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                throw err;
            yield server.oas();
        }));
        server.listen(env_1.PORT, '0.0.0.0', (error, address) => {
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