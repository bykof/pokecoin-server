import { prop, Typegoose, Ref, instanceMethod, InstanceType } from 'typegoose'
import * as crypto from 'crypto'

import { UserClass } from '../../users/models/User'
import { Block, numberLiteralTypeAnnotation } from '@babel/types';

export class BlockClass extends Typegoose {
  @prop()
  hash: String

  @prop()
  previousHash: String

  @prop({default: 1})
  index: number = 1

  @prop()
  data: String

  @prop()
  timestamp: number

  @prop({default: 1})
  nonce: number = 1

  @prop({ ref: UserClass })
  foundByUser: Ref<UserClass>

  @instanceMethod
  calculateHash(this: InstanceType<BlockClass>): String {
    const information = (
      this.previousHash +
      this.index.toString() +
      this.timestamp.toString() +
      this.data +
      this.nonce.toString()
    )
    return crypto.createHash('sha256').update(information).digest('hex')
  }

  @instanceMethod
  mineHash(this: InstanceType<BlockClass>, difficulty: number): String {
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
}

export default new BlockClass().getModelForClass(BlockClass)
