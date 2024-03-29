export default {
  $id: "CardPack",
  title: "CardPack",
  description: "A pack of cards. Formerly known as Booster.",
  required: ["name", "cards"],
  type: "object",
  properties: {
    name: { type: "string" },
    cards: {
      type: "array",
      items: { $ref: "PokemonCard" },
    },
  },
};
