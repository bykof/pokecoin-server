import { SUPERTYPE_POKEMON } from "./constants";
import PokemonCard from "../models/PokemonCard";
import Card from "../models/base/Card";

export default class JsonCardParser {
  static parseJsonCard(jsonCard): Card {
    if (jsonCard.supertype === SUPERTYPE_POKEMON) {
      return new PokemonCard(jsonCard);
    } else {
      return new Card(jsonCard);
    }
  }
}
