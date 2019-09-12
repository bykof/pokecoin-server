import cardSchema from "./cardSchema";
import pokemonCardSchema from "./pokemonCardSchema";

export const responseSuccessfulSchema = {
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
        then: pokemonCardSchema,
        else: cardSchema,
      },
    },
  }
}
