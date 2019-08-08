"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardSchema_1 = require("./cardSchema");
const abilitySchema_1 = require("./abilitySchema");
const attackSchema_1 = require("./attackSchema");
const weaknessSchema_1 = require("./weaknessSchema");
const cardSchemaCopy = Object.assign(cardSchema_1.default, {});
cardSchemaCopy.properties = Object.assign(cardSchemaCopy.properties, {
    level: { type: 'string' },
    evolvesFrom: { type: 'string' },
    ability: abilitySchema_1.default,
    hp: { type: 'string' },
    retreatCost: {
        type: 'array',
        items: { type: 'string' },
    },
    convertedRetreatCost: { type: 'integer' },
    types: {
        type: 'array',
        items: { type: 'string' },
    },
    attacks: {
        type: 'array',
        items: attackSchema_1.default,
    },
    weaknesses: {
        type: 'array',
        items: weaknessSchema_1.default,
    },
    nationalPokedexNumber: { type: 'integer' },
    evolvesTo: {
        type: 'array',
        items: { type: 'string' },
    },
});
exports.default = cardSchemaCopy;
//# sourceMappingURL=pokemonCardSchema.js.map