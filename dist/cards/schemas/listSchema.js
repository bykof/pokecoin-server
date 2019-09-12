"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardSchema_1 = require("./cardSchema");
const pokemonCardSchema_1 = require("./pokemonCardSchema");
exports.responseSuccessfulSchema = {
    type: 'object',
    properties: {
        cards: {
            type: 'array',
            items: {
                type: 'object',
                properties: {},
                if: {
                    type: "object",
                    properties: {
                        supertype: { type: "string", const: "Pokémon" },
                    }
                },
                then: pokemonCardSchema_1.default,
                else: cardSchema_1.default,
            },
        },
    }
};
//# sourceMappingURL=listSchema.js.map