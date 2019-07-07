import SchemaError from "../../core/errors/SchemaError";

export default class CardPackNotFoundError extends SchemaError {

  cardPackName: string

  constructor(cardPackName: string) {
    super(CardPackNotFoundError.name, `Cardpack ${cardPackName} was not found`)
    this.cardPackName = cardPackName
  }
}
