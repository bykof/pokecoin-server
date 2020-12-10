import CardPack from "../models/CardPack";
import JsonCardParser from "./JsonCardParser";

export default class CardPacksAggregate {
  static object: CardPacksAggregate;

  cardPacks: CardPack[] = [];

  private constructor() {}

  static getInstance(): CardPacksAggregate {
    if (!this.object) {
      this.object = new CardPacksAggregate();
    }
    return this.object;
  }

  cardPackNames() {
    return this.cardPacks.map((cardPack) => cardPack.name);
  }

  addCardPackFromJson(name, cardsJson) {
    this.cardPacks.push(
      new CardPack(name, cardsJson.map(JsonCardParser.parseJsonCard))
    );
  }

  getCardPackByName(name): CardPack | undefined {
    return this.cardPacks.find((cardPack) => cardPack.name === name);
  }
}
