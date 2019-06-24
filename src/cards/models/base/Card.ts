export default class Card {
  id: String
  name: String
  imageUrl: String
  subtype: String
  supertype: String
  number: String
  artist: String
  rarity: String
  series: String
  set: String
  setCode: String
  imageUrlHiRes: String
  text: String[] = null

  constructor(data) {
    for (const key in data) {
      this[key] = data[key]
    }
  }
}
