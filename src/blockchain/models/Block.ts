import {
  prop,
  Ref,
  DocumentType,
  ReturnModelType,
  getModelForClass,
} from "@typegoose/typegoose";
import * as crypto from "crypto";

import { User, UserModel } from "../../users/models/User";
import { DEFAULT_USERNAME } from "../../users/core/UserSetup";

export class Block {
  @prop()
  public hash!: String;

  @prop()
  public previousHash!: String;

  @prop()
  public data!: String;

  @prop()
  public timestamp!: number;

  @prop({ default: 1 })
  public nonce: number = 1;

  @prop({ ref: "User" })
  public foundByUser!: Ref<User>;

  calculateHash(this: DocumentType<Block>): String {
    const information =
      this.previousHash +
      this.timestamp.toString() +
      this.data +
      this.nonce.toString();
    return crypto.createHash("sha256").update(information).digest("hex");
  }

  mineHash(this: DocumentType<Block>, difficulty: number): String {
    const difficultyAsZeros = new Array(difficulty).fill(0).join("");
    while (
      this.calculateHash().substring(0, difficulty) !== difficultyAsZeros
    ) {
      this.nonce++;

      // If we have gone through all nonce so we get to 0
      // than we reset the timestamp and nonce
      if (this.nonce === Number.MAX_SAFE_INTEGER) {
        this.timestamp = Date.now();
        this.nonce = 0;
      }
    }
    return this.calculateHash();
  }

  static createFromRequest(
    this: ReturnModelType<typeof Block>,
    request
  ): DocumentType<Block> {
    const newBlock = new this();
    newBlock.previousHash = request.body.previousHash;
    newBlock.data = request.body.data;
    newBlock.timestamp = request.body.timestamp;
    newBlock.nonce = request.body.nonce;
    newBlock.hash = newBlock.calculateHash();
    newBlock.foundByUser = request.user;
    return newBlock;
  }

  static async createFirstBlock(
    this: ReturnModelType<typeof Block>
  ): Promise<DocumentType<Block>> {
    const newBlock = new this();
    newBlock.previousHash = "";
    newBlock.data = "Genesis Block #1";
    newBlock.timestamp = Date.now();
    newBlock.nonce = 0;
    newBlock.hash = newBlock.calculateHash();
    newBlock.foundByUser = await UserModel.findOne({
      username: DEFAULT_USERNAME,
    });
    await newBlock.save();
    return newBlock;
  }
}

export const BlockModel = getModelForClass(Block);
