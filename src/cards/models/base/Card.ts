export default class Card {
  id: string;
  name: string;
  imageUrl: string;
  subtype: string;
  supertype: string;
  number: string;
  artist: string;
  rarity: string;
  series: string;
  set: string;
  setCode: string;
  imageUrlHiRes: string;
  text: string[];

  constructor(data) {
    for (const key in data) {
      this[key] = data[key];
    }
  }
}
