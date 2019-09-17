export default {
  $id: 'BuyDefaultPackageSchemaResponse',
  title: 'BuyDefaultPackageSchemaResponse',
  $schema: "http://json-schema.org/draft-07/schema#",
  type: 'object',
  properties: {
    cards: { type: 'array', items: 'PokemonCard#'}
  }
}
