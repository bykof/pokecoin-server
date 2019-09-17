"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: "CardsResponse",
    title: 'CardsResponse',
    description: 'Returns an array of cards',
    $schema: "http://json-schema.org/draft-07/schema#",
    type: 'object',
    required: [
        'cards'
    ],
    properties: {
        cards: {
            $id: "#/properties/cards",
            type: 'array',
            items: 'PokemonCard#',
        },
    }
};
//# sourceMappingURL=cardsResponse.js.map