export default class Ability {
  name: String
  text: String
  type: String

  constructor(data) {
    for(const key in data) {
      this[key] = data[key]
    }
  }
}
