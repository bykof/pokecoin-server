"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(data) {
        for (const key in data) {
            this[key] = data[key];
        }
    }
}
exports.default = Card;
//# sourceMappingURL=Card.js.map