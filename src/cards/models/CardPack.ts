import Card from './base/Card'

export default class CardPack {
  name: string
  cards: Card[]

  constructor(name, cards) {
    this.name = name
    this.cards = cards
  }
}
