import { prop, Typegoose, Ref } from '@hasezoey/typegoose'

import { User } from '../../users/models/User'

export class UserCardTransaction extends Typegoose {

  @prop()
  cardId: string

  @prop()
  cardPack: string

  @prop()
  timestamp: number

  @prop({ ref: User })
  user: Ref<User>
}

export const UserCardTransactionModel = new UserCardTransaction().getModelForClass(UserCardTransaction)
