import cardSchema from "./cardSchema"

export const responseSuccessfulSchema = {
  type: 'object',
  properties: {
    cards: { type: 'array', items: cardSchema }
  }
}
