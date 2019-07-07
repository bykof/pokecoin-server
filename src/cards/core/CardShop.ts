import { InstanceType } from "typegoose"

import { User } from "../../users/models/User"
import CardPacksAggregate from "./CardPacksAggregate"
import CardPackNotFoundError from "../errors/CardPackNotFoundError"
import Wallet from "../../wallet/core/Wallet"
import NotSufficientCoinsError from "../errors/NotSufficientCoinsError"
import { UserCardTransactionModel } from "../models/UserCardTransaction"

export default class CardShop {
  DEFAULT_PACKAGE_COST = 25

  user: InstanceType<User>
  wallet: Wallet

  constructor(user: InstanceType<User>) {
    this.user = user
    this.wallet = new Wallet(this.user)
  }

  async hasSufficientCoinsForDefaultPackage() {
    const currentBalance = await this.wallet.getBalance()
    return currentBalance >= this.DEFAULT_PACKAGE_COST
  }

  async saveCardAsUserCardTransaction(card, cardPackName) {
    return await new UserCardTransactionModel({
      cardId: card.id,
      cardPack: cardPackName,
      timestamp: Date.now(),
      user: this.user,
    }).save()
  }

  async buyDefaultPackage(cardPackName) {
    if (!(await this.hasSufficientCoinsForDefaultPackage())) {
      throw new NotSufficientCoinsError(await this.wallet.getBalance())
    }

    const cardPacksAggregate = CardPacksAggregate.getInstance()
    const cardPack = cardPacksAggregate.getCardPackByName(cardPackName)

    if (cardPack) {
      const defaultPackage = cardPack.createDefaultPackage()
      for (const card of defaultPackage) {
        await this.saveCardAsUserCardTransaction(card, cardPackName)
      }
      this.wallet.withdraw(this.DEFAULT_PACKAGE_COST)
    } else {
      throw new CardPackNotFoundError(cardPackName)
    }
  }
}
