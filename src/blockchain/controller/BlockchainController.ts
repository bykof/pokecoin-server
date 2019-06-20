import Blockchain from "../core/Blockchain"
import { BlockModel } from "../models/Block"
import BlockIsNotValidError from "../errors/BlockIsNotValidError"
import * as lockfile from 'lockfile'
import Wallet from "../../wallet/core/Wallet";

export default class BlockchainController {

  static ADD_BLOCKCHAIN_BLOCK_LOCK = 'addBlockchainBlock.lock'

  /**
   * Validate a block and add it to the blockchain
   *
   * @param request
   * @param reply
   */
  static async addBlock(request, reply) {
    lockfile.lock(
      BlockchainController.ADD_BLOCKCHAIN_BLOCK_LOCK, {
        wait: 1000 * 30,
      },
      async () => {
        const blockchain = Blockchain.getInstance()
        const wallet = new Wallet(request.user)
        const newBlock = BlockModel.createFromRequest(request)

        if (!blockchain.blockIsValid(newBlock)) {
          lockfile.unlock(BlockchainController.ADD_BLOCKCHAIN_BLOCK_LOCK, () => {})
          return reply.status(400).send(new BlockIsNotValidError(newBlock, blockchain))
        } else {
          await newBlock.save()
          await blockchain.updateChain()
          const newTransaction = await wallet.addReward(newBlock)
          lockfile.unlock(BlockchainController.ADD_BLOCKCHAIN_BLOCK_LOCK, () => {})

          return reply.send({
            block: newBlock,
            transaction: newTransaction
          })
        }
      }
    )
  }

  /**
   * Get the last block of the blockchain
   * @param request
   * @param reply
   */
  static async lastBlock(request, reply) {
    const blockchain = Blockchain.getInstance()
    const lastBlock = blockchain.lastBlock
    lastBlock.populate('foundByUser')
    await lastBlock.execPopulate()
    return reply.send(lastBlock)
  }
}
