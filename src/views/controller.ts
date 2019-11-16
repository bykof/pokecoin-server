import * as moment from 'moment'
import Blockchain from "../blockchain/core/Blockchain"
import { UserModel } from '../users/models/User'
import Wallet from '../wallet/core/Wallet'
import { UserCardTransactionModel } from '../cards/models/UserCardTransaction';


export async function blockchainView(request, reply) {
  const blockchain = Blockchain.getInstance()
  await Promise.all(blockchain.chain.map(async (block) => {
    block.foundByUser = await UserModel.findById(block.foundByUser)
  }))
  const reversedChain = blockchain.chain.slice()
  reversedChain.reverse()

  reply.view(
    'blockchain',
    {
      chain: reversedChain,
      moment: moment,
    },
  )
}

export async function dashboardView(request, reply) {
  const blockchain = Blockchain.getInstance()
  const users = await UserModel.find()
  const userCards = await UserCardTransactionModel.find()
  // Populate all users
  await Promise.all(blockchain.chain.map((block) => block.populate('foundByUser').execPopulate()))

  return reply.view(
    'dashboard',
    {
      blockchain: blockchain,
      users: users,
      userCards: userCards,
      moment: moment,
    },
  )
}

export async function usersView(request, reply) {
  let users = await UserModel.find()
  const wallets = {}
  await Promise.all(
    users.map(
      async (user) => {
        const wallet = new Wallet(user)
        wallets[user.username] = {
          cards: await UserCardTransactionModel.find({ user: user }),
          balance: await wallet.getBalance()
        }
        user['points'] = await user.getPoints()
      }
    )
  )

  users = users.sort((a, b) => {
    return a['points'] - b['points']
  })

  reply.view(
    'users',
    {
      users: users,
      wallets: wallets,
      moment: moment,
    },
    { async: true },
  )
}
