import CardPack from "./CardPack"
import * as BaseCards from '../../json/pokemonCards/Base.json'
import JsonCardParser from "../core/JsonCardParser";
import { RARITY_COMMON, RARITY_UNCOMMON, RARITY_RARE } from "../core/constants";


test('test CardPack to create proper defaultPackage', () => {
  const defaultPackageRarities = [RARITY_COMMON, RARITY_COMMON, RARITY_COMMON, RARITY_UNCOMMON, RARITY_RARE]
  const cardPack = new CardPack('Base', BaseCards.map(JsonCardParser.parseJsonCard))
  const defaultPackage = cardPack.createDefaultPackage()
  const defaultPackage2 = cardPack.createDefaultPackage()

  expect(defaultPackage.length).toBe(5)
  expect(defaultPackage2.length).toBe(5)
  expect(defaultPackage.map((card) => card.rarity)).toStrictEqual(defaultPackageRarities)
  expect(defaultPackage2.map((card) => card.rarity)).toStrictEqual(defaultPackageRarities)

  expect(defaultPackage).not.toBe(defaultPackage2)
})
