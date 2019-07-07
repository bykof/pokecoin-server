import SchemaError from "../../core/errors/SchemaError";

export default class NotSufficientCoinsError extends SchemaError {

  currentCoins: number

  constructor(currentCoins: number) {
    super(NotSufficientCoinsError.name, `You have not sufficient coins. Current coins: ${currentCoins}`)
    this.currentCoins = currentCoins
  }
}
