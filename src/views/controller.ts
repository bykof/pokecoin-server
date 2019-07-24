import * as moment from 'moment'
import Blockchain from "../blockchain/core/Blockchain"

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
