import Card from './base/Card'
import { RARITY_UNCOMMON, RARITY_COMMON, RARITY_RARE } from '../core/constants';

export default class CardPack {
  DEFAULT_PACKAGE_COMMON = 3
  DEFAULT_PACKAGE_UNCOMMON = 1
  DEFAULT_PACKAGE_RARE = 1

  name: string
  cards: Card[]

  constructor(name, cards) {
    this.name = name
    this.cards = cards
  }

  /**
   * Create an object which keys are the rarity of all cards
   * and the values contain lists of cards by rarity
   */
  cardsByRarity() {
    const cardsByRarity = {}
    for (const card of this.cards) {
      if (!(card.rarity in cardsByRarity)) {
        cardsByRarity[card.rarity] = []
      }

      cardsByRarity[card.rarity].push(card)
    }

    return cardsByRarity
  }

  selectRandomCardFromCards(cards: Card[]) {
    const randomIndex = Math.floor(Math.random() * cards.length)
    return cards[randomIndex]
  }

  /**
   * Create package selects 3 Common cards, 1 Uncommon Card and 1 Rare Card
   */
  createDefaultPackage(): Card[] {
    const cardsByRarity = this.cardsByRarity()
    const defaultPackage = []

    // Insert 3 common cards
    for (let i = 0; i < this.DEFAULT_PACKAGE_COMMON; i++) {
      defaultPackage.push(this.selectRandomCardFromCards(cardsByRarity[RARITY_COMMON]))
    }

    for (let i = 0; i < this.DEFAULT_PACKAGE_UNCOMMON; i++) {
      defaultPackage.push(this.selectRandomCardFromCards(cardsByRarity[RARITY_UNCOMMON]))
    }

    for (let i = 0; i < this.DEFAULT_PACKAGE_RARE; i++) {
      defaultPackage.push(this.selectRandomCardFromCards(cardsByRarity[RARITY_RARE]))
    }

    return defaultPackage
  }
}
