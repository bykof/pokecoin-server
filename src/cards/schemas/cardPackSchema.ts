export default {
  $id: 'CardPack',
  title: 'CardPack',
  $schema: "http://json-schema.org/draft-07/schema#",
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
