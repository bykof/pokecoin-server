import CardPacksAggregate from "../core/CardPacksAggregate";
import CardShop from "../core/CardShop";

export default class CardPackController {
  static async getCardPackages(request, reply) {
    return reply.send(CardPacksAggregate.getInstance().cardPackNames());
  }

  static async getCardPack(request, reply) {
    const cardPack = CardPacksAggregate.getInstance().getCardPackByName(
      request.params.cardPackName
    );
    if (cardPack) {
      return reply.send(cardPack);
    } else {
      return reply.code(404).send();
    }
  }

  static async buyDefaultPackage(request, reply) {
    const cardShop = new CardShop(request.user);
    try {
      const cardPackage = await cardShop.buyDefaultPackage(
        request.params.cardPackName
      );
      return reply.send({ cards: cardPackage });
    } catch (error) {
      return reply.code(400).send(error);
    }
  }

  static async currentPackageCost(request, reply) {
    const cardShop = new CardShop(request.user);
    return reply.send(cardShop.DEFAULT_PACKAGE_COST);
  }
}
