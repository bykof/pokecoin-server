"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const PokemonCard_1 = require("../models/PokemonCard");
const Card_1 = require("../models/base/Card");
class JsonCardParser {
    static parseJsonCard(jsonCard) {
        if (jsonCard.supertype === constants_1.SUPERTYPE_POKEMON) {
            return new PokemonCard_1.default(jsonCard);
        }
        else {
            return new Card_1.default(jsonCard);
        }
    }
}
exports.default = JsonCardParser;
//# sourceMappingURL=JsonCardParser.js.map