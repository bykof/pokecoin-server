import * as moment from 'moment'
import Blockchain from "../blockchain/core/Blockchain"
import { UserModel } from '../users/models/User'
import Wallet from '../wallet/core/Wallet'
import { UserCardTransactionModel } from '../cards/models/UserCardTransaction';


export async function blockchainView(request, reply) {
  const blockchain = Blockchain.getInstance()
  // Populate all users
  await Promise.all(blockchain.chain.map((block) => block.populate('foundByUser').execPopulate()))
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

export async function usersView(request, reply) {
  const users = await UserModel.find()
  const wallets = {}
  await Promise.all(
    users.map(
      async (user) => {
        const wallet = new Wallet(user)
        wallets[user.username] = {
          cards: await UserCardTransactionModel.find({user: user}),
          balance: await wallet.getBalance()
        }
      }
    )
  )
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
