import { UserCardTransactionModel } from "../models/UserCardTransaction";

export default class UserCardController {
  static async getCards(request, reply) {
    const userCards = await UserCardTransactionModel.find({
      user: request.user,
    });
    return reply.send(userCards);
  }
}
