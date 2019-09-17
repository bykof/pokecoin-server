export default {
  $id: "CardResponse",
  title: "CardResponse",
  description: 'Returns object for one card',
  $schema: "http://json-schema.org/draft-07/schema#",
  type: 'object',
  required: [
    'card',
  ],
  properties: {
    card: 'PokemonCard#',
  }
}
