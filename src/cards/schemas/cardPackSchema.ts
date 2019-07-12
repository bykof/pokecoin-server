import cardSchema from './cardSchema'
import pokemonCardSchema from './pokemonCardSchema';

export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    cards: {
      type: 'array', items: pokemonCardSchema,
    },
  },
}
