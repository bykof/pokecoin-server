
import { InstanceType } from 'typegoose'

import { Block, BlockModel } from '../models/Block'

export default class Blockchain{

  private static instance

  chain: InstanceType<Block>[]
  _currentDifficulty: number

  private constructor(difficulty=4) {
    this.chain = []
    this._currentDifficulty = difficulty
  }

  static getInstance(): Blockchain {
    if (!this.instance) {
      this.instance = new Blockchain()
    }

    return this.instance
  }

  async setup() {
    await this.updateChain()
  }

  get currentDifficulty(): number {
    return this._currentDifficulty
  }

  get difficultyAsZeros(): String {
    return Array(this.currentDifficulty).fill(0).join('')
  }

  get lastBlock(): InstanceType<Block> {
    return this.chain[this.chain.length - 1]
  }

  /**
   * Resets the singleton instance to a newly created blockchain instance
   */
  static resetInstance() {
    this.instance = new Blockchain()
  }

  /**
   * Validates if the blockchain is correct
   */
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

  /**
   * Check if the given block is proper calculated and the hash does not exists in the chain
   * @param block
   */
  blockIsValid(block: InstanceType<Block>): boolean {
    return (
      block.calculateHash().substring(0, this.currentDifficulty) === this.difficultyAsZeros &&
      (this.lastBlock ? block.previousHash === this.lastBlock.hash : true)
    )
  }

  /**
   * Updates the chain with new blocks from the database
   * @param newBlock
   */
  async updateChain(){
    this.chain = await BlockModel.find()
  }
}
