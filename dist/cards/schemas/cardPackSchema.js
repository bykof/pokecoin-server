"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: 'CardPack',
    title: 'CardPack',
    required: [
        'name',
        'cards',
    ],
    type: 'object',
    properties: {
        name: { type: 'string' },
        cards: {
            type: 'array', items: 'PokemonCard#',
        },
    },
};
//# sourceMappingURL=cardPackSchema.js.map