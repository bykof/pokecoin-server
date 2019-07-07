import CardPacksAggregate from "./CardPacksAggregate"
import * as BaseCards from '../../json/pokemonCards/Base.json'

const cardsAggregate = CardPacksAggregate.getInstance()
cardsAggregate.addCardPackFromJson('base', BaseCards)

test('test CardPacksAggregate', () => {
  expect(cardsAggregate.cardPacks.length).toBe(1)
  expect(cardsAggregate.cardPacks[0].name).toBe('base')
  expect(cardsAggregate.cardPacks[0].cards.length).toBe(102)
})
