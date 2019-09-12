import cardSchema from "./cardSchema";
import pokemonCardSchema from "./pokemonCardSchema";

export const responseSuccessfulSchema = {
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
      then: pokemonCardSchema,
      else: cardSchema,
    },
  }
}
