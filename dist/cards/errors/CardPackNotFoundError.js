"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaError_1 = require("../../core/errors/SchemaError");
class CardPackNotFoundError extends SchemaError_1.default {
    constructor(cardPackName) {
        super(CardPackNotFoundError.name, `Cardpack ${cardPackName} was not found`);
        this.cardPackName = cardPackName;
    }
}
exports.default = CardPackNotFoundError;
//# sourceMappingURL=CardPackNotFoundError.js.map