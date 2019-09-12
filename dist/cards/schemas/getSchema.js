"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardSchema_1 = require("./cardSchema");
const pokemonCardSchema_1 = require("./pokemonCardSchema");
exports.responseSuccessfulSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "SchemaResponse",
    type: 'object',
    properties: {
        card: {
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
    }
};
//# sourceMappingURL=getSchema.js.map