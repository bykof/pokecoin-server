import { prop, Ref, getModelForClass } from "@typegoose/typegoose";

import { User } from "../../users/models/User";

export class UserCardTransaction {
  @prop()
  cardId: string;

  @prop()
  cardPack: string;

  @prop()
  timestamp: number;

  @prop({ ref: "User" })
  user: Ref<User>;
}

export const UserCardTransactionModel = getModelForClass(UserCardTransaction);
