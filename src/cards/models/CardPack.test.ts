import CardPack from "./CardPack";
import * as BaseCards from "../../json/pokemonCards/Base.json";
import JsonCardParser from "../core/JsonCardParser";
import { RARITY_RARE } from "../core/constants";

test("test CardPack to create proper defaultPackage", () => {
  const cardPack = new CardPack(
    "Base",
    BaseCards.map(JsonCardParser.parseJsonCard)
  );
  const defaultPackages = [];
  for (let i = 0; i < 100; i++) {
    defaultPackages.push(cardPack.createDefaultPackage());
  }
  expect(defaultPackages[0].length).toBe(5);

  let rarities = [];
  for (const defaultPackage of defaultPackages) {
    rarities = rarities.concat(defaultPackage.map((card) => card.rarity));
  }

  // Ensure to be at least 1, although this can be also 0
  expect(
    rarities.filter((rarity) => rarity === RARITY_RARE).length
  ).toBeGreaterThan(1);
});
