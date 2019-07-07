import cardSchema from './cardSchema'

export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    cards: { type: 'array', items: cardSchema }
  }
}
