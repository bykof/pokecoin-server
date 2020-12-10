import CardsAggregate from "../core/CardsAggregate";
import IPaginator from "../../core/interfaces/IPaginator";
import Paginator from "../../core/Paginator";

export default class CardController {
  static async list(request, reply) {
    const cardsAggregate = CardsAggregate.getInstance();
    const paginator: IPaginator = new Paginator(request, cardsAggregate.cards);
    return reply.send({ cards: paginator.getCurrentObjects() });
  }

  static async get(request, reply) {
    const cardsAggregate = CardsAggregate.getInstance();
    const card = cardsAggregate.getCardById(request.params.cardId);

    if (card) {
      return reply.send({ card: card });
    } else {
      return reply.status(404).send();
    }
  }
}
