export default {
  $id: 'UserCard',
  title: 'UserCard',
  description: 'An user card',
  $schema: "http://json-schema.org/draft-07/schema#",
  type: 'object',
  properties: {
    cardId: { type: 'string' },
    cardPack: { type: 'string' },
    timestamp: { type: 'integer' },
  }
}
