export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    cost: {
      type: 'array',
      items: { type: 'string' },
    },
    convertedEnergyCost: { type: 'integer' },
    damage: { type: 'string' },
    text: { type: 'string' },
  },
}
