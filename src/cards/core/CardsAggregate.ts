import Card from "../models/base/Card"
import {SUPERTYPE_POKEMON, SUPERTYPE_ENERGY, SUPERTYPE_TRAINER} from './constants'
import JsonCardParser from "./JsonCardParser"

export default class CardsAggregate {
  static instance: CardsAggregate = null

  cards: Card[] = []

  private constructor() { }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CardsAggregate()
    }

    return this.instance
  }

  addCardsFromJson(cards) {
    this.cards = this.cards.concat(cards.map(JsonCardParser.parseJsonCard))
  }

  filterBySuperType(superType: String): Card[] {
    return this.cards.filter((card) => card.supertype === superType)
  }

  getPokemonCards(): Card[] {
    return this.filterBySuperType(SUPERTYPE_POKEMON)
  }

  getEnergyCards(): Card[] {
    return this.filterBySuperType(SUPERTYPE_ENERGY)
  }

  getTrainerCards(): Card[] {
    return this.filterBySuperType(SUPERTYPE_TRAINER)
  }

  getCardById(id: String): Card | undefined {
    return this.cards.find((card) => card.id === id)
  }
}
