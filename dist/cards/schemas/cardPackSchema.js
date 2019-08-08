"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemonCardSchema_1 = require("./pokemonCardSchema");
exports.default = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        cards: {
            type: 'array', items: pokemonCardSchema_1.default,
        },
    },
};
//# sourceMappingURL=cardPackSchema.js.map