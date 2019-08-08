"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("./base/Card");
const Ability_1 = require("./base/Ability");
const Attack_1 = require("./base/Attack");
const Weakness_1 = require("./base/Weakness");
class PokemonCard extends Card_1.default {
    constructor(data) {
        super(data);
        this.ability = new Ability_1.default(data.ability);
        this.attacks = data.attacks.map((attack) => new Attack_1.default(attack));
        if (data.weaknesses) {
            this.weaknesses = data.weaknesses.map((weakness) => new Weakness_1.default(weakness));
        }
    }
}
exports.default = PokemonCard;
//# sourceMappingURL=PokemonCard.js.map