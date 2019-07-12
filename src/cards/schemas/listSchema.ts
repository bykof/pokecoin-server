import cardSchema from "./cardSchema";
import pokemonCardSchema from "./pokemonCardSchema";

export const responseSuccessfulSchema = {
  type: 'object',
  properties: {
    cards: {
      type: 'array',
      items: pokemonCardSchema,
    },
  }
}
