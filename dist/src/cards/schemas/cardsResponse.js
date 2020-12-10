"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $id: "CardsResponse",
    title: "CardsResponse",
    description: "Returns an array of cards",
    type: "object",
    required: ["cards"],
    properties: {
        cards: {
            type: "array",
            items: { $ref: "PokemonCard#" },
        },
    },
};
//# sourceMappingURL=cardsResponse.js.map