import SchemaError from "../../core/errors/SchemaError";
import { Block } from "../models/Block";
import Blockchain from "../core/Blockchain";

export default class BlockIsNotValidError extends SchemaError {
  block: Block
  lastBlock: Block

  constructor(block: Block, blockchain: Blockchain) {
    super(BlockIsNotValidError.name, `Block with hash ${block.hash} is not valid`)
    this.block = block
    this.lastBlock = blockchain.lastBlock
  }
}
