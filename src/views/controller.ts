import * as moment from 'moment'
import Blockchain from "../blockchain/core/Blockchain"
import { UserModel } from '../users/models/User'
import Wallet from '../wallet/core/Wallet'
import { UserCardTransactionModel } from '../cards/models/UserCardTransaction';
import { server } from '..';


export async function blockchainView(request, reply) {
  const blockchain = Blockchain.getInstance()
  await Promise.all(blockchain.chain.map(async (block) => {
    block.foundByUser = await UserModel.findById(block.foundByUser)
  }))
  const reversedChain = blockchain.chain.slice()
  reversedChain.reverse()

  const html = await server['view'](
    'blockchain',
    {
      chain: reversedChain,
      moment: moment,
    },
  )
  reply.type('text/html').send(html)
}

export async function dashboardView(request, reply) {
  const blockchain = Blockchain.getInstance()
  const users = await UserModel.find()
  const userCards = await UserCardTransactionModel.find()

  const html = await server['view'](
    'dashboard',
    {
      blockchain: blockchain,
      users: users,
      userCards: userCards,
      moment: moment,
    },
  )
  reply.type('text/html').send(html)
}

export async function usersView(request, reply) {
  let users = await UserModel.find()
  const wallets = {}
  await Promise.all(
    users.map(
      async (user) => {
        const wallet = new Wallet(user)
        wallets[user.username] = {
          cards: await UserCardTransactionModel.find({ user: user._id }),
          balance: await wallet.getBalance()
        }
        user['points'] = await user.getPoints()
      }
    )
  )

  users.sort((a, b) => {
    return b['points'] - a['points']
  })

  const html = await server['view'](
    'users',
    {
      users: users,
      wallets: wallets,
      moment: moment,
    },
  )
  reply.type('text/html').send(html)
}
