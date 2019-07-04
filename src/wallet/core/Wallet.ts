import { InstanceType } from "typegoose"
import { User } from "../../users/models/User"
import { TransactionModel, Transaction } from "../models/Transaction"
import { Block } from "../../blockchain/models/Block";

export default class Wallet {
  DEFAULT_REWARD: number = 1
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

  /**
   * Add a reward for current wallet for a found block
   * @param block the block which was found
   */
  async addReward(block: InstanceType<Block>) {
    const newTransaction = await new TransactionModel({
      amount: this.DEFAULT_REWARD,
      timestamp: Date.now(),
      rewardOfBlock: block,
      user: this.user,
    }).save()
    return newTransaction
  }
}