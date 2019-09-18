import * as BaseCards from '../../json/pokemonCards/Base.json'
import CardsAggregate from './CardsAggregate'
import PokemonCard from '../models/PokemonCard'
import Ability from '../models/base/Ability'
import Weakness from '../models/base/Weakness'
import Attack from '../models/base/Attack'
import Card from '../models/base/Card'

const cardsAggregate = CardsAggregate.getInstance()
cardsAggregate.addCardsFromJson(BaseCards)

test('test CardReader to init with Base.json', () => {
  expect(cardsAggregate.cards.length).toBe(102)
})

test('test CardReader to get all pokemon cards', () => {
  expect(cardsAggregate.getPokemonCards().length).toBe(69)
})

test('test CardReader to get all trainer cards', () => {
  expect(cardsAggregate.getTrainerCards().length).toBe(26)
})

test('test CardReader to get all energy cards', () => {
  expect(cardsAggregate.getEnergyCards().length).toBe(7)
})

test('test CardReader to get a Pokemon Card (Alakazam)', () => {
  const alakazam: PokemonCard = <PokemonCard> cardsAggregate.getCardById('base1-1')
  expect(alakazam).toStrictEqual(new PokemonCard({
    "id": "base1-1",
    "name": "Alakazam",
    "imageUrl": "https://images.pokemontcg.io/base1/1.png",
    "subtype": "Stage 2",
    "supertype": "Pokémon",
    "level": "42",
    "evolvesFrom": "Kadabra",
    "ability": new Ability({
      "name": "Damage Swap",
      "text": "As often as you like during your turn (before your attack), you may move 1 damage counter from 1 of your Pokémon to another as long as you don't Knock Out that Pokémon. This power can't be used if Alakazam is Asleep, Confused, or Paralyzed.",
      "type": "Pokémon Power"
    }),
    "hp": "80",
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "number": "1",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "series": "Base",
    "set": "Base",
    "setCode": "base1",
    "types": [
      "Psychic"
    ],
    "attacks": [
      new Attack({
        "name": "Confuse Ray",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Flip a coin. If heads, defender is now Confused."
      }),
    ],
    "weaknesses": [
      new Weakness({
        "type": "Psychic",
        "value": "×2"
      }),
    ],
    "imageUrlHiRes": "https://images.pokemontcg.io/base1/1_hires.png",
    "nationalPokedexNumber": 65
  }))
})

test('test CardReader to get a trainer card (Devolution Spray)', () => {
  const devolutionSpray = cardsAggregate.getCardById('base1-72')
  expect(devolutionSpray).toStrictEqual(new Card({
      "id": "base1-72",
      "name": "Devolution Spray",
      "imageUrl": "https://images.pokemontcg.io/base1/72.png",
      "subtype": "",
      "supertype": "Trainer",
      "number": "72",
      "artist": "Keiji Kinebuchi",
      "rarity": "Rare",
      "series": "Base",
      "set": "Base",
      "setCode": "base1",
      "text": [
        "Choose 1 of your own Pokémon in play and a Stage of Evolution. Discard all Evolution cards of that Stage or higher attached to that Pokémon. That Pokémon is no longer Asleep, Confused, Paralyzed, Poisoned, or anything else that might be the result of an attack (just as if you had evolved it)."
      ],
      "imageUrlHiRes": "https://images.pokemontcg.io/base1/72_hires.png"
  }))
})
