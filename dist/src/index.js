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
exports.setupDatabase = exports.server = void 0;
const fastify_1 = require("fastify");
const fastify_swagger_1 = require("fastify-swagger");
const mongoose = require("mongoose");
const ejs = require("ejs");
const fastify_cors_1 = require("fastify-cors");
const point_of_view_1 = require("point-of-view");
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
const schemas_1 = require("./core/schemas");
const schemas_2 = require("./users/schemas");
const schemas_3 = require("./cards/schemas");
const schemas_4 = require("./blockchain/schemas");
const schemas_5 = require("./wallet/schemas");
exports.server = fastify_1.default({ logger: true });
const blockchain = Blockchain_1.default.getInstance();
const cardPacksAggregate = CardPacksAggregate_1.default.getInstance();
cardPacksAggregate.addCardPackFromJson('Base', BaseJSON);
const cardsAggregate = CardsAggregate_1.default.getInstance();
cardsAggregate.addCardsFromJson(BaseJSON);
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect(env_1.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log('established connection to mongodb');
    });
}
exports.setupDatabase = setupDatabase;
function startApplication() {
    return __awaiter(this, void 0, void 0, function* () {
        process.on('SIGTERM', () => process.exit());
        yield setupDatabase();
        yield UserSetup_1.default.setup();
        yield blockchain.setup();
        console.log(`Blockchain is set up`);
        schemas_1.init(exports.server);
        schemas_2.init(exports.server);
        schemas_3.init(exports.server);
        schemas_5.init(exports.server);
        schemas_4.init(exports.server);
        exports.server.register(fastify_cors_1.default, {
            origin: '*',
            credentials: true,
        });
        exports.server.register(point_of_view_1.default, {
            engine: {
                ejs: ejs,
            },
            templates: './src/templates',
            includeViewExtension: true,
        });
        exports.server
            .register(fastify_swagger_1.default, swaggerConfig_1.default)
            .register(routes_1.default, { prefix: '/auth' })
            .register(routes_2.default, { prefix: '/blockchain' })
            .register(routes_3.default, { prefix: '/wallet' })
            .register(routes_4.default, { prefix: '/cards' })
            .register(routes_5.default, { prefix: '/views' })
            .after((error) => {
            if (error) {
                console.log(error);
            }
        });
        exports.server.ready((err) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                throw err;
            yield exports.server.swagger();
        }));
        exports.server.listen(env_1.PORT, '0.0.0.0', (error, address) => {
            if (error) {
                exports.server.log.error(error.message);
                process.exit(1);
            }
            console.log('Server running:', address);
        });
    });
}
startApplication().catch(console.log);
//# sourceMappingURL=index.js.map