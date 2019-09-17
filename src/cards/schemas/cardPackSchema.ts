export default {
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
}
