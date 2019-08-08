"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemonCardSchema_1 = require("./pokemonCardSchema");
exports.responseSuccessfulSchema = {
    type: 'object',
    properties: {
        cards: {
            type: 'array',
            items: pokemonCardSchema_1.default,
        },
    }
};
//# sourceMappingURL=listSchema.js.map