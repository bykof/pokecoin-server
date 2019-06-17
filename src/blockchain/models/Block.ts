import { prop, Typegoose, Ref, instanceMethod, InstanceType, staticMethod, ModelType } from 'typegoose'
import * as crypto from 'crypto'

import { User } from '../../users/models/User'

export class Block extends Typegoose {
  @prop()
  hash: String

  @prop()
  previousHash: String

  @prop()
  data: String

  @prop()
  timestamp: number

  @prop({default: 1})
  nonce: number = 1

  @prop({ ref: User })
  foundByUser: Ref<User>

  @instanceMethod
  calculateHash(this: InstanceType<Block>): String {
    const information = (
      this.previousHash +
      this.timestamp.toString() +
      this.data +
      this.nonce.toString()
    )
    return crypto.createHash('sha256').update(information).digest('hex')
  }

  @instanceMethod
  mineHash(this: InstanceType<Block>, difficulty: number): String {
    const difficultyAsZeros = new Array(difficulty).fill(0).join('')
    while (this.calculateHash().substring(0, difficulty) !== difficultyAsZeros) {
      this.nonce++

      // If we have gone through all nonce so we get to 0 than we update the timestamp
      if (this.nonce === Number.MAX_SAFE_INTEGER) {
        this.timestamp = Date.now()
      }
    }
    return this.calculateHash()
  }

  @staticMethod
  static createFromRequest(this: ModelType<Block>, request): InstanceType<Block> {
    const newBlock = new this()
    newBlock.previousHash = request.body.previousHash
    newBlock.data = request.body.data
    newBlock.timestamp = request.body.timestamp
    newBlock.nonce = request.body.nonce
    newBlock.hash = newBlock.calculateHash()
    newBlock.foundByUser = request.user
    return newBlock
  }
}

export const BlockModel = new Block().getModelForClass(Block)
