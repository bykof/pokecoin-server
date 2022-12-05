import {
  prop,
  DocumentType,
  ReturnModelType,
  getModelForClass,
} from "@typegoose/typegoose";
import * as crypto from "crypto";
import { sign as signJWT, verify as verifyJWT } from "jsonwebtoken";
import { JWT_SECRET } from "../../env";
import Wallet from "../../wallet/core/Wallet";
import { UserCardTransactionModel } from "../../cards/models/UserCardTransaction";

export class User {
  @prop({ required: true, unique: true })
  username: string;

  @prop({ required: true })
  password: string;

  static hashPassword(password: crypto.BinaryLike): string {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  static decodeJSONWebToken(token: string): Object | null {
    try {
      return verifyJWT(token, JWT_SECRET);
    } catch (error) {
      // Since I know that the error will be an unverified jwt token
      // i can return null and don't log an error
      return null;
    }
    return null;
  }

  static async getUserByJSONWebToken(
    this: ReturnModelType<typeof User>,
    token: string
  ): Promise<DocumentType<User>> {
    const decodedToken = this.decodeJSONWebToken(token);
    if (decodedToken) {
      return await this.findOne({ username: decodedToken["username"] });
    }
  }

  generateJSONWebToken(this: DocumentType<User>): string {
    return signJWT({ username: this.username }, JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
  }

  async getPoints(this: DocumentType<User>): Promise<Number> {
    const wallet = new Wallet(this);
    const userCardTransactionsCount = await UserCardTransactionModel.count({
      user: this,
    });
    const balance = await wallet.getBalance();
    return balance + userCardTransactionsCount * 6;
  }
}

export const UserModel = getModelForClass(User);
