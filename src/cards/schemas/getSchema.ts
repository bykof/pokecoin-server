import cardSchema from "./cardSchema";

export const responseSuccessfulSchema = {
  type: 'object',
  properties: {
    card: cardSchema,
  }
}
