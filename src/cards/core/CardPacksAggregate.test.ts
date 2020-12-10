import CardPacksAggregate from "./CardPacksAggregate";
import * as BaseCards from "../../json/pokemonCards/Base.json";

const cardsAggregate = CardPacksAggregate.getInstance();
cardsAggregate.addCardPackFromJson("Base", BaseCards);

test("test CardPacksAggregate", () => {
  expect(cardsAggregate.cardPacks.length).toBe(1);
  expect(cardsAggregate.cardPacks[0].name).toBe("Base");
  expect(cardsAggregate.cardPacks[0].cards.length).toBe(102);
});

test("test CardPacksAggregate getCardPackByName", () => {
  expect(cardsAggregate.getCardPackByName("Base")).toBe(
    cardsAggregate.cardPacks[0]
  );
  expect(cardsAggregate.getCardPackByName("NotFound")).toBeUndefined();
});
