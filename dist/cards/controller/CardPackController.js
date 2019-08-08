"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CardPacksAggregate_1 = require("../core/CardPacksAggregate");
const CardShop_1 = require("../core/CardShop");
class CardPackController {
    static getCardPackages(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            return reply.send(CardPacksAggregate_1.default.getInstance().cardPackNames());
        });
    }
    static getCardPack(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardPack = CardPacksAggregate_1.default.getInstance().getCardPackByName(request.params.cardPackName);
            if (cardPack) {
                return reply.send(cardPack);
            }
            else {
                return reply.status(404).send();
            }
        });
    }
    static buyDefaultPackage(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardShop = new CardShop_1.default(request.user);
            try {
                const cardPackage = yield cardShop.buyDefaultPackage(request.params.cardPackName);
                return reply.send({ cards: cardPackage });
            }
            catch (error) {
                return reply.status(400).send(error);
            }
        });
    }
}
exports.default = CardPackController;
//# sourceMappingURL=CardPackController.js.map