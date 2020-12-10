import { DocumentType } from "@typegoose/typegoose";
import { User } from "../../users/models/User";
import { TransactionModel, Transaction } from "../models/Transaction";
import { Block } from "../../blockchain/models/Block";

export default class Wallet {
  DEFAULT_REWARD: number = parseInt(process.env.DEFAULT_REWARD) || 1;
  user: DocumentType<User>;

  constructor(user: DocumentType<User>) {
    this.user = user;
  }

  /**
   * Get the balance of a user
   * It will sum the amount of all transactions
   */
  async getBalance() {
    const transactions = await TransactionModel.aggregate([
      { $match: { user: this.user._id } },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);
    if (transactions.length === 0) return 0;
    return transactions[0].total;
  }

  /**
   * Add a reward for current wallet for a found block
   * @param block the block which was found
   */
  async addReward(block: DocumentType<Block>) {
    const newTransaction = await new TransactionModel({
      amount: this.DEFAULT_REWARD,
      timestamp: Date.now(),
      rewardOfBlock: block,
      user: this.user,
    }).save();
    return newTransaction;
  }

  /**
   * Withdraw an amount from users balance account
   * amount should be a positive integer
   * @param amount
   */
  async withdraw(amount: number) {
    const newTransaction = await new TransactionModel({
      amount: -amount,
      timestamp: Date.now(),
      user: this.user,
    }).save();
    return newTransaction;
  }
}
