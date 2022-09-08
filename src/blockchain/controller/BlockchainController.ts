import Blockchain from "../core/Blockchain";
import { BlockModel } from "../models/Block";
import BlockIsNotValidError from "../errors/BlockIsNotValidError";
import * as lockfile from "lockfile";
import Wallet from "../../wallet/core/Wallet";
import { UserModel } from "../../users/models/User";
import { checkIfBrowser as isBrowser } from "../../core/utils";

export default class BlockchainController {
  static ADD_BLOCKCHAIN_BLOCK_LOCK = "addBlockchainBlock.lock";
  /**
   * Validate a block and add it to the blockchain
   *
   * @param request
   * @param reply
   */
  static async addBlock(request, reply) {
    lockfile.lockSync(BlockchainController.ADD_BLOCKCHAIN_BLOCK_LOCK);
    try {
      if (!isBrowser(request.headers["user-agent"])) {
        console.log("not a browser");
        return reply
          .code(400)
          .send({ message: "please no automated scripts!" });
      }

      const blockchain = Blockchain.getInstance();
      const wallet = new Wallet(request.user);
      const newBlock = BlockModel.createFromRequest(request);
      const blockIsValid = await blockchain.blockIsValid(newBlock);

      if (!blockIsValid) {
        console.log("block is not valid");
        const lastBlock = await blockchain.getLastBlock();

        console.log("reply 400");
        return reply
          .code(400)
          .send(new BlockIsNotValidError(newBlock, lastBlock));
      } else {
        await newBlock.save();
        const newTransaction = await wallet.addReward(newBlock);

        console.log("send block");
        return reply.send({
          block: newBlock,
          transaction: newTransaction,
        });
      }
    } finally {
      lockfile.unlockSync(BlockchainController.ADD_BLOCKCHAIN_BLOCK_LOCK);
    }
  }

  /**
   * Get the last block of the blockchain
   * @param request
   * @param reply
   */
  static async lastBlock(request, reply) {
    const blockchain = Blockchain.getInstance();
    const lastBlock = await blockchain.getLastBlock();
    lastBlock.foundByUser = await UserModel.findById(lastBlock.foundByUser);
    return reply.send(lastBlock);
  }

  /**
   * Get the current POW difficulty of the blockchain
   * @param requeest
   * @param reply
   */
  static async currentDifficulty(request, reply) {
    const blockchain = Blockchain.getInstance();
    return reply.send(blockchain.currentDifficulty);
  }
}
