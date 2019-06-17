import SchemaError from "../../core/errors/SchemaError";
import { InstanceType } from "typegoose";
import { Block } from "../models/Block";
import Blockchain from "../core/Blockchain";

export default class BlockIsNotValidError extends SchemaError {
  block: InstanceType<Block>
  lastBlock: InstanceType<Block>

  constructor(block: InstanceType<Block>, blockchain: Blockchain) {
    super(BlockIsNotValidError.name, `Block with hash ${block.hash} is not valid`)
    this.block = block
    this.lastBlock = blockchain.lastBlock
  }
}
