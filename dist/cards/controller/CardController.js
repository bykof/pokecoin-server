"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CardsAggregate_1 = require("../core/CardsAggregate");
const Paginator_1 = require("../../core/Paginator");
class CardController {
    static list(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardsAggregate = CardsAggregate_1.default.getInstance();
            const paginator = new Paginator_1.default(request, cardsAggregate.cards);
            return reply.send({ cards: paginator.getCurrentObjects() });
        });
    }
    static get(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardsAggregate = CardsAggregate_1.default.getInstance();
            const card = cardsAggregate.getCardById(request.params.cardId);
            if (card) {
                return reply.send({ card: card });
            }
            else {
                return reply.status(404).send();
            }
        });
    }
}
exports.default = CardController;
//# sourceMappingURL=CardController.js.map