"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaError_1 = require("../../core/errors/SchemaError");
class NotSufficientCoinsError extends SchemaError_1.default {
    constructor(currentCoins, costs) {
        super(NotSufficientCoinsError.name, `You have not sufficient coins. Current coins: ${currentCoins}, costs ${costs}`);
        this.currentCoins = currentCoins;
        this.costs = costs;
    }
}
exports.default = NotSufficientCoinsError;
//# sourceMappingURL=NotSufficientCoinsError.js.map