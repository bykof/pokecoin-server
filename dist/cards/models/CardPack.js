"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../core/constants");
class CardPack {
    constructor(name, cards) {
        this.DEFAULT_PACKAGE_COMMON = 3;
        this.DEFAULT_PACKAGE_UNCOMMON = 1;
        this.DEFAULT_PACKAGE_RARE = 1;
        this.name = name;
        this.cards = cards;
    }
    /**
     * Create an object which keys are the rarity of all cards
     * and the values contain lists of cards by rarity
     */
    cardsByRarity() {
        const cardsByRarity = {};
        for (const card of this.cards) {
            if (!(card.rarity in cardsByRarity)) {
                cardsByRarity[card.rarity] = [];
            }
            cardsByRarity[card.rarity].push(card);
        }
        return cardsByRarity;
    }
    selectRandomCardFromCards(cards) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        return cards[randomIndex];
    }
    isOneOfProbability(probability) {
        const randomIndex = Math.floor(Math.random() * probability) + 1;
        return randomIndex == 1;
    }
    /**
     * Create package selects 3 Common cards, 1 Uncommon Card and 1 Rare Card
     */
    createDefaultPackage() {
        const cardsByRarity = this.cardsByRarity();
        const defaultPackage = [];
        // Insert 3 common cards
        for (let i = 0; i < this.DEFAULT_PACKAGE_COMMON; i++) {
            defaultPackage.push(this.selectRandomCardFromCards(cardsByRarity[constants_1.RARITY_COMMON]));
        }
        for (let i = 0; i < this.DEFAULT_PACKAGE_UNCOMMON; i++) {
            defaultPackage.push(this.selectRandomCardFromCards(cardsByRarity[constants_1.RARITY_UNCOMMON]));
        }
        for (let i = 0; i < this.DEFAULT_PACKAGE_RARE; i++) {
            if (this.isOneOfProbability(3)) {
                defaultPackage.push(this.selectRandomCardFromCards(cardsByRarity[constants_1.RARITY_RARE]));
            }
            else {
                defaultPackage.push(this.selectRandomCardFromCards(cardsByRarity[constants_1.RARITY_UNCOMMON]));
            }
        }
        return defaultPackage;
    }
}
exports.default = CardPack;
//# sourceMappingURL=CardPack.js.map