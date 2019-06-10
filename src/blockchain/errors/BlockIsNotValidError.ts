import SchemaError from "../../core/errors/SchemaError";
import { InstanceType } from "typegoose";
import { Block } from "@babel/types";

export default class BlockIsNotValidError extends SchemaError {
  block: InstanceType<Block>
  currentDifficulty: Number

  constructor(block, currentDifficulty) {
    super(BlockIsNotValidError.name, `Block with hash ${block.hash} is not valid for difficulty (${currentDifficulty})`)
    this.block = block
    this.currentDifficulty = currentDifficulty
  }
}
