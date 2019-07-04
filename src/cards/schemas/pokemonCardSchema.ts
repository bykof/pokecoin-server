import cardSchema from "./cardSchema"
import abilitySchema from "./abilitySchema"
import attackSchema from "./attackSchema"
import weaknessSchema from "./weaknessSchema"

export default Object.assign(
  cardSchema,
  {
    level: { type: 'string' },
    evolvesFrom: { type: 'string' },
    ability: abilitySchema,
    hp: { type: 'string' },
    retreatCost: {
      type: 'array',
      items: { type: 'string' },
    },
    convertedRetreatCost: { type: 'integer' },
    types: {
      type: 'array',
      items: { type: 'string' },
    },
    attacks: {
      type: 'array',
      items: attackSchema,
    },
    weaknesses: {
      type: 'array',
      items: weaknessSchema,
    },
    nationalPokedexNumber: { type: 'integer' },
    evolvesTo: {
      type: 'array',
      items: { type: 'string' },
    },
  }
)
