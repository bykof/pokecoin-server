import { prop, Ref, getModelForClass } from "@typegoose/typegoose";

import { User } from "../../users/models/User";
import { Block } from "../../blockchain/models/Block";

export class Transaction {
  @prop()
  amount: number;

  @prop()
  timestamp: number;

  @prop({ ref: "Block" })
  rewardOfBlock: Ref<Block>;

  @prop({ ref: "User" })
  user: Ref<User>;
}

export const TransactionModel = getModelForClass(Transaction);
