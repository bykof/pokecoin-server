import Blockchain from "../core/Blockchain";
import { BlockModel } from "../models/Block";
import BlockIsNotValidError from "../errors/BlockIsNotValidError";
import { UserModel } from "../../users/models/User";

export default class BlockchainController {
  /**
   * Validate a block and add it to the blockchain
   *
   * @param request
   * @param reply
   */
  static async addBlock(request, reply) {
    const blockchain = Blockchain.getInstance()
    const newBlock = BlockModel.createFromRequest(request)

    if (!blockchain.blockIsValid(newBlock)) {
      return reply.status(400).send(new BlockIsNotValidError(newBlock, blockchain))
    } else {
      await newBlock.save()
      await blockchain.updateChain()
      return reply.send({block: newBlock})
      // Save the block and return reward
    }
  }
}
