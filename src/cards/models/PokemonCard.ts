import Card from "./base/Card"
import Ability from "./base/Ability"
import Attack from "./base/Attack"
import Weakness from "./base/Weakness";

export default class PokemonCard extends Card {
  level: String
  evolvesFrom: String
  ability: Ability
  hp: String
  retreatCost: String[]
  convertedRetreatCost: Number
  types: String[]
  attacks: Attack[]
  weaknesses: Weakness[]
  nationalPokedexNumber: Number
  evolvesTo: String[]

  constructor(data) {
    super(data)
    this.ability = new Ability(data.ability)
    this.attacks = data.attacks.map((attack) => new Attack(attack))
    if (data.weaknesses) {
      this.weaknesses = data.weaknesses.map((weakness) => new Weakness(weakness))
    }
  }
}
