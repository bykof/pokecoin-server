
import { InstanceType } from 'typegoose'

import Block, { BlockClass } from './models/Block'
import SchemaError from '../core/errors/SchemaError'
import BlockIsNotValidError from './errors/BlockIsNotValidError'

export default class BlockChain {
  chain: InstanceType<BlockClass>[]
  _currentDifficulty: number = 4

  constructor() {
    this.chain = []
  }

  async setup() {
    this.chain = await Block.find()
  }

  get currentDifficulty(): number {
    return this._currentDifficulty
  }

  get difficultyAsZeros(): String {
    return Array(this.currentDifficulty).fill(0).join('')
  }

  validateBlockChain(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.calculateHash() !== currentBlock.hash) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
  }

  lastBlock(): InstanceType<BlockClass> {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock: InstanceType<BlockClass>): InstanceType<BlockClass> | SchemaError {
    // For safety use the calculateHash function :3
    if (newBlock.calculateHash().substring(0, this.currentDifficulty) !== this.difficultyAsZeros) {
      throw new BlockIsNotValidError(newBlock, this.currentDifficulty)
    }
    newBlock.save()
    this.chain.push(newBlock)
    return newBlock
  }
}
