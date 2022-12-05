export default {
  $id: "CardResponse",
  title: "CardResponse",
  description: "Returns object for one card",
  type: "object",
  required: ["card"],
  properties: {
    card: { $ref: "PokemonCard" },
  },
};
