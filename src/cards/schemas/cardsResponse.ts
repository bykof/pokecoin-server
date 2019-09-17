export default {
  $id: "CardsResponse",
  title: 'CardsResponse',
  description: 'Returns an array of cards',
  type: 'object',
  required: [
    'cards'
  ],
  properties: {
    cards: {
      $id: "#/properties/cards",
      type: 'array',
      items: 'PokemonCard#',
    },
  }
}
