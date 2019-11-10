export default {
  $id: 'BuyDefaultPackageSchemaResponse',
  title: 'BuyDefaultPackageSchemaResponse',
  description: 'Buy a default cardpackage and receive an array of bought cards',
  type: 'object',
  properties: {
    cards: { type: 'array', items: 'PokemonCard#'}
  }
}
