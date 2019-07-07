import { UserModel } from "../../users/models/User"
import CardShop from "./CardShop"
import NotSufficientCoinsError from "../errors/NotSufficientCoinsError"
import CardPacksAggregate from "./CardPacksAggregate"
import * as BaseCards from '../../json/pokemonCards/Base.json'
import CardPackNotFoundError from "../errors/CardPackNotFoundError"
import { TransactionModel } from "../../wallet/models/Transaction"
import { UserCardTransactionModel } from "../models/UserCardTransaction"

const cardsAggregate = CardPacksAggregate.getInstance()
cardsAggregate.addCardPackFromJson('Base', BaseCards)

test('test not sufficient pokecoins of user error', async () => {
  const user = new UserModel({ username: 'test', password: 'test' })
  const cardShop = new CardShop(user)
  cardShop.wallet.getBalance = jest.fn(async () => 0)
  expect(cardShop.buyDefaultPackage('Base')).rejects.toEqual(new NotSufficientCoinsError(0))
})


test('test card pack not found error', async () => {
  const user = new UserModel({ username: 'test', password: 'test' })
  const cardShop = new CardShop(user)
  expect(cardShop.buyDefaultPackage('NotFound')).rejects.toStrictEqual(new CardPackNotFoundError('NotFound'))
})

test('test buyDefaultPackage', async () => {
  const user = new UserModel({ username: 'test', password: 'test' })
  const cardShop = new CardShop(user)
  cardShop.wallet.getBalance = jest.fn(async () => 25)
  cardShop.wallet.withdraw = jest.fn(
    async (amount) => {
      return new TransactionModel({
        amount: -amount,
        timestamp: Date.now(),
        user: this.user,
      })
    }
  )
  cardShop.saveCardAsUserCardTransaction = jest.fn(
    async (card, cardPackName) => {
      return new UserCardTransactionModel({
        cardId: card.id,
        cardPack: cardPackName,
        timestamp: Date.now(),
        user: this.user,
      })
    }
  )

  await cardShop.buyDefaultPackage('Base')
  expect(cardShop.wallet.getBalance).toBeCalledTimes(1)
  expect(cardShop.saveCardAsUserCardTransaction).toBeCalledTimes(5)
  expect(cardShop.wallet.withdraw).toBeCalledTimes(1)
  expect(cardShop.wallet.withdraw).toBeCalledWith(25)
})
