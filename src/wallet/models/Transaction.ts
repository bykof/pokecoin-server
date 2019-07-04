import { prop, Typegoose, Ref, instanceMethod, InstanceType, staticMethod, ModelType } from 'typegoose'

import { User } from '../../users/models/User'
import { Block } from '../../blockchain/models/Block';

export class Transaction extends Typegoose {

  @prop()
  amount: number

  @prop()
  timestamp: number

  @prop({ ref: Block })
  rewardOfBlock: Ref<Block>

  @prop({ ref: User })
  user: Ref<User>
}

export const TransactionModel = new Transaction().getModelForClass(Transaction)