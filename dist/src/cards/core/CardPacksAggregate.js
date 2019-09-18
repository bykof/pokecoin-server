"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CardPack_1 = require("../models/CardPack");
const JsonCardParser_1 = require("./JsonCardParser");
class CardPacksAggregate {
    constructor() {
        this.cardPacks = [];
    }
    static getInstance() {
        if (!this.object) {
            this.object = new CardPacksAggregate();
        }
        return this.object;
    }
    cardPackNames() {
        return this.cardPacks.map((cardPack) => cardPack.name);
    }
    addCardPackFromJson(name, cardsJson) {
        this.cardPacks.push(new CardPack_1.default(name, cardsJson.map(JsonCardParser_1.default.parseJsonCard)));
    }
    getCardPackByName(name) {
        return this.cardPacks.find((cardPack) => cardPack.name === name);
    }
}
exports.default = CardPacksAggregate;
//# sourceMappingURL=CardPacksAggregate.js.map