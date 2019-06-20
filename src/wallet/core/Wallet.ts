import { InstanceType } from "typegoose"
import { User } from "../../users/models/User"
import { TransactionModel, Transaction } from "../models/Transaction"

export default class Wallet {
  user: InstanceType<User>

  constructor(user: InstanceType<User>) {
    this.user = user
  }

  /**
   * Get the balance of a user
   * It will sum the amount of all transactions
   */
  async getBalance() {
    const transactions: InstanceType<Transaction>[] = await TransactionModel.find({user: this.user})
    return transactions.reduce(
      (accumulator, transaction) => accumulator + transaction.amount,
      0
    )
  }
}
