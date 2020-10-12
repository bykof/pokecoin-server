export default {
  $id: "PokemonCard",
  type: "object",
  title: "PokemonCard",
  description: 'A Pokemon card',
  required: ["id", "name"],
  properties: {
    id: {
      $id: "#/properties/id",
      type: "string",
      title: "The Id Schema",
      pattern: "^(.*)$"
    },
    name: {
      $id: "#/properties/name",
      type: "string",
      title: "The Name Schema",
      pattern: "^(.*)$"
    },
    imageUrl: {
      $id: "#/properties/imageUrl",
      type: "string",
      title: "The Imageurl Schema",
      pattern: "^(.*)$"
    },
    subtype: {
      $id: "#/properties/subtype",
      type: "string",
      title: "The Subtype Schema",
      pattern: "^(.*)$"
    },
    supertype: {
      $id: "#/properties/supertype",
      type: "string",
      title: "The Supertype Schema",
      pattern: "^(.*)$"
    },
    number: {
      $id: "#/properties/number",
      type: "string",
      title: "The Number Schema",
      pattern: "^(.*)$"
    },
    artist: {
      $id: "#/properties/artist",
      type: "string",
      title: "The Artist Schema",
      pattern: "^(.*)$"
    },
    rarity: {
      $id: "#/properties/rarity",
      type: "string",
      title: "The Rarity Schema",
      default: "",
      pattern: "^(.*)$"
    },
    series: {
      $id: "#/properties/series",
      type: "string",
      title: "The Series Schema",
      pattern: "^(.*)$"
    },
    set: {
      $id: "#/properties/set",
      type: "string",
      title: "The Set Schema",
      pattern: "^(.*)$"
    },
    setCode: {
      $id: "#/properties/setCode",
      type: "string",
      title: "The Setcode Schema",
      pattern: "^(.*)$"
    },
    imageUrlHiRes: {
      $id: "#/properties/imageUrlHiRes",
      type: "string",
      title: "The Imageurlhires Schema",
      pattern: "^(.*)$"
    },
    text: {
      $id: "#/properties/text",
      type: "array",
      title: "The Text Schema",
      items: {
        $id: "#/properties/text/items",
        type: "string",
        title: "The Text Items Schema"
      }
    },
    level: {
      $id: "#/properties/level",
      type: "string",
      title: "The Level Schema",
      pattern: "^(.*)$"
    },
    evolvesFrom: {
      $id: "#/properties/evolvesFrom",
      type: "string",
      title: "The Evolvesfrom Schema",
      pattern: "^(.*)$"
    },
    ability: {
      $id: "#/properties/ability",
      type: "object",
      title: "The Ability Schema",
      properties: {
        name: {
          $id: "#/properties/ability/properties/name",
          type: "string",
          title: "The Name Schema",
          pattern: "^(.*)$"
        },
        text: {
          $id: "#/properties/ability/properties/text",
          type: "string",
          title: "The Text Schema",
          pattern: "^(.*)$"
        },
        type: {
          $id: "#/properties/ability/properties/type",
          type: "string",
          title: "The Type Schema",
          pattern: "^(.*)$"
        }
      }
    },
    hp: {
      $id: "#/properties/hp",
      type: "string",
      title: "The Hp Schema",
      pattern: "^(.*)$"
    },
    retreatCost: {
      $id: "#/properties/retreatCost",
      type: "array",
      title: "The Retreatcost Schema",
      items: {
        $id: "#/properties/retreatCost/items",
        type: "string",
        title: "The Items Schema",
        pattern: "^(.*)$"
      }
    },
    convertedRetreatCost: {
      $id: "#/properties/convertedRetreatCost",
      type: "integer",
      title: "The Convertedretreatcost Schema",
    },
    types: {
      $id: "#/properties/types",
      type: "array",
      title: "The Types Schema",
      items: {
        $id: "#/properties/types/items",
        type: "string",
        title: "The Items Schema",
        pattern: "^(.*)$"
      }
    },
    attacks: {
      $id: "#/properties/attacks",
      type: "array",
      title: "The Attacks Schema",
      items: {
        $id: "#/properties/attacks/items",
        type: "object",
        title: "The Items Schema",
        required: ["name", "cost", "convertedEnergyCost", "damage"],
        properties: {
          name: {
            $id: "#/properties/attacks/items/properties/name",
            type: "string",
            title: "The Name Schema",
            default: "",
            pattern: "^(.*)$"
          },
          cost: {
            $id: "#/properties/attacks/items/properties/cost",
            type: "array",
            title: "The Cost Schema",
            items: {
              $id: "#/properties/attacks/items/properties/cost/items",
              type: "string",
              title: "The Items Schema",
              pattern: "^(.*)$"
            }
          },
          convertedEnergyCost: {
            $id: "#/properties/attacks/items/properties/convertedEnergyCost",
            type: "integer",
            title: "The Convertedenergycost Schema",
            default: 0,
          },
          damage: {
            $id: "#/properties/attacks/items/properties/damage",
            type: "string",
            title: "The Damage Schema",
            pattern: "^(.*)$"
          },
          text: {
            $id: "#/properties/attacks/items/properties/text",
            type: "string",
            title: "The Text Schema",
            pattern: "^(.*)$"
          }
        }
      }
    },
    weaknesses: {
      $id: "#/properties/weaknesses",
      type: "array",
      title: "The Weaknesses Schema",
      items: {
        $id: "#/properties/weaknesses/items",
        type: "object",
        title: "The Items Schema",
        required: ["type", "value"],
        properties: {
          type: {
            $id: "#/properties/weaknesses/items/properties/type",
            type: "string",
            title: "The Type Schema",
            pattern: "^(.*)$"
          },
          value: {
            $id: "#/properties/weaknesses/items/properties/value",
            type: "string",
            title: "The Value Schema",
            pattern: "^(.*)$"
          }
        }
      }
    },
    nationalPokedexNumber: {
      $id: "#/properties/nationalPokedexNumber",
      type: "integer",
      title: "The Nationalpokedexnumber Schema",
    }
  }
};
