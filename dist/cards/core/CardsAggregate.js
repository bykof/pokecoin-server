"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const JsonCardParser_1 = require("./JsonCardParser");
class CardsAggregate {
    constructor() {
        this.cards = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CardsAggregate();
        }
        return this.instance;
    }
    addCardsFromJson(cards) {
        this.cards = this.cards.concat(cards.map(JsonCardParser_1.default.parseJsonCard));
    }
    filterBySuperType(superType) {
        return this.cards.filter((card) => card.supertype === superType);
    }
    getPokemonCards() {
        return this.filterBySuperType(constants_1.SUPERTYPE_POKEMON);
    }
    getEnergyCards() {
        return this.filterBySuperType(constants_1.SUPERTYPE_ENERGY);
    }
    getTrainerCards() {
        return this.filterBySuperType(constants_1.SUPERTYPE_TRAINER);
    }
    getCardById(id) {
        return this.cards.find((card) => card.id === id);
    }
}
CardsAggregate.instance = null;
exports.default = CardsAggregate;
//# sourceMappingURL=CardsAggregate.js.map