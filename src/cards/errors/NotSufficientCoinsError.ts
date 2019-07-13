import SchemaError from "../../core/errors/SchemaError";

export default class NotSufficientCoinsError extends SchemaError {

  currentCoins: number
  costs: number

  constructor(currentCoins: number, costs: number) {
    super(NotSufficientCoinsError.name, `You have not sufficient coins. Current coins: ${currentCoins}, costs ${costs}`)
    this.currentCoins = currentCoins
    this.costs = costs
  }
}
