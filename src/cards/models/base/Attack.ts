export default class Attack {
  name: String
  cost: String[]
  convertedEnergyCost: Number
  damage: String
  text: String

  constructor(data) {
    for (const key in data) {
      this[key] = data[key]
    }
  }
}
