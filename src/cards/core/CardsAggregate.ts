import Card from "../models/base/Card";
import PokemonCard from "../models/PokemonCard";

export default class CardsAggregate {
  SUPERTYPE_POKEMON = 'Pokémon'
  SUPERTYPE_TRAINER = 'Trainer'
  SUPERTYPE_ENERGY = 'Energy'
  cards: Card[] = []

  constructor(cards) {
    this.addCards(cards)
  }

  addCards(cards) {
    this.cards = this.cards.concat(
      cards.map(
        (card) => {
          if (card.supertype === this.SUPERTYPE_POKEMON) {
            return new PokemonCard(card)
          } else {
            return new Card(card)
          }
        }
      )
    )
  }

  filterBySuperType(superType: String): Card[] {
    return this.cards.filter((card) => card.supertype === superType)
  }

  getPokemonCards(): Card[] {
    return this.filterBySuperType(this.SUPERTYPE_POKEMON)
  }

  getEnergyCards(): Card[]  {
    return this.filterBySuperType(this.SUPERTYPE_ENERGY)
  }

  getTrainerCards(): Card[]  {
    return this.filterBySuperType(this.SUPERTYPE_TRAINER)
  }

  getCardById(id: String): Card | undefined {
    return this.cards.find((card) => card.id === id)
  }
}
