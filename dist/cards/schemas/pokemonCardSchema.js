"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    definitions: {},
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "PokemonCard",
    type: "object",
    title: "Pokemoncard",
    description: 'A Pokemon card',
    required: ["id", "name"],
    properties: {
        id: {
            $id: "#/properties/id",
            type: "string",
            title: "The Id Schema",
            examples: ["base1-1"],
            pattern: "^(.*)$"
        },
        name: {
            $id: "#/properties/name",
            type: "string",
            title: "The Name Schema",
            examples: ["Alakazam"],
            pattern: "^(.*)$"
        },
        imageUrl: {
            $id: "#/properties/imageUrl",
            type: "string",
            title: "The Imageurl Schema",
            examples: ["https://images.pokemontcg.io/base1/1.png"],
            pattern: "^(.*)$"
        },
        subtype: {
            $id: "#/properties/subtype",
            type: "string",
            title: "The Subtype Schema",
            examples: ["Stage 2"],
            pattern: "^(.*)$"
        },
        supertype: {
            $id: "#/properties/supertype",
            type: "string",
            title: "The Supertype Schema",
            examples: ["Pokémon"],
            pattern: "^(.*)$"
        },
        number: {
            $id: "#/properties/number",
            type: "string",
            title: "The Number Schema",
            examples: ["1"],
            pattern: "^(.*)$"
        },
        artist: {
            $id: "#/properties/artist",
            type: "string",
            title: "The Artist Schema",
            examples: ["Ken Sugimori"],
            pattern: "^(.*)$"
        },
        rarity: {
            $id: "#/properties/rarity",
            type: "string",
            title: "The Rarity Schema",
            default: "",
            examples: ["Rare"],
            pattern: "^(.*)$"
        },
        series: {
            $id: "#/properties/series",
            type: "string",
            title: "The Series Schema",
            examples: ["Base"],
            pattern: "^(.*)$"
        },
        set: {
            $id: "#/properties/set",
            type: "string",
            title: "The Set Schema",
            examples: ["Base"],
            pattern: "^(.*)$"
        },
        setCode: {
            $id: "#/properties/setCode",
            type: "string",
            title: "The Setcode Schema",
            examples: ["base1"],
            pattern: "^(.*)$"
        },
        imageUrlHiRes: {
            $id: "#/properties/imageUrlHiRes",
            type: "string",
            title: "The Imageurlhires Schema",
            examples: ["https://images.pokemontcg.io/base1/1_hires.png"],
            pattern: "^(.*)$"
        },
        text: {
            $id: "#/properties/text",
            type: "array",
            title: "The Text Schema",
            examples: [["Test"]],
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
            examples: ["42"],
            pattern: "^(.*)$"
        },
        evolvesFrom: {
            $id: "#/properties/evolvesFrom",
            type: "string",
            title: "The Evolvesfrom Schema",
            examples: ["Kadabra"],
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
                    examples: ["Damage Swap"],
                    pattern: "^(.*)$"
                },
                text: {
                    $id: "#/properties/ability/properties/text",
                    type: "string",
                    title: "The Text Schema",
                    examples: [""],
                    pattern: "^(.*)$"
                },
                type: {
                    $id: "#/properties/ability/properties/type",
                    type: "string",
                    title: "The Type Schema",
                    examples: ["Pokémon Power"],
                    pattern: "^(.*)$"
                }
            }
        },
        hp: {
            $id: "#/properties/hp",
            type: "string",
            title: "The Hp Schema",
            examples: ["80"],
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
                examples: ["Colorless", "Colorless", "Colorless"],
                pattern: "^(.*)$"
            }
        },
        convertedRetreatCost: {
            $id: "#/properties/convertedRetreatCost",
            type: "integer",
            title: "The Convertedretreatcost Schema",
            examples: [3]
        },
        types: {
            $id: "#/properties/types",
            type: "array",
            title: "The Types Schema",
            items: {
                $id: "#/properties/types/items",
                type: "string",
                title: "The Items Schema",
                examples: ["Psychic"],
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
                        examples: ["Confuse Ray"],
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
                            examples: ["Psychic", "Psychic", "Psychic"],
                            pattern: "^(.*)$"
                        }
                    },
                    convertedEnergyCost: {
                        $id: "#/properties/attacks/items/properties/convertedEnergyCost",
                        type: "integer",
                        title: "The Convertedenergycost Schema",
                        default: 0,
                        examples: [3]
                    },
                    damage: {
                        $id: "#/properties/attacks/items/properties/damage",
                        type: "string",
                        title: "The Damage Schema",
                        examples: ["30"],
                        pattern: "^(.*)$"
                    },
                    text: {
                        $id: "#/properties/attacks/items/properties/text",
                        type: "string",
                        title: "The Text Schema",
                        examples: ["Flip a coin. If heads, defender is now Confused."],
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
                        examples: ["Psychic"],
                        pattern: "^(.*)$"
                    },
                    value: {
                        $id: "#/properties/weaknesses/items/properties/value",
                        type: "string",
                        title: "The Value Schema",
                        examples: ["×2"],
                        pattern: "^(.*)$"
                    }
                }
            }
        },
        nationalPokedexNumber: {
            $id: "#/properties/nationalPokedexNumber",
            type: "integer",
            title: "The Nationalpokedexnumber Schema",
            examples: [65]
        }
    }
};
//# sourceMappingURL=pokemonCardSchema.js.map