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
const CardPacksAggregate_1 = require("./CardPacksAggregate");
const CardPackNotFoundError_1 = require("../errors/CardPackNotFoundError");
const Wallet_1 = require("../../wallet/core/Wallet");
const NotSufficientCoinsError_1 = require("../errors/NotSufficientCoinsError");
const UserCardTransaction_1 = require("../models/UserCardTransaction");
class CardShop {
    constructor(user) {
        this.DEFAULT_PACKAGE_COST = parseInt(process.env.DEFAULT_PACKAGE_COST) || 25;
        this.user = user;
        this.wallet = new Wallet_1.default(this.user);
    }
    hasSufficientCoinsForDefaultPackage() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentBalance = yield this.wallet.getBalance();
            return currentBalance >= this.DEFAULT_PACKAGE_COST;
        });
    }
    saveCardAsUserCardTransaction(card, cardPackName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new UserCardTransaction_1.UserCardTransactionModel({
                cardId: card.id,
                cardPack: cardPackName,
                timestamp: Date.now(),
                user: this.user._id,
            }).save();
        });
    }
    buyDefaultPackage(cardPackName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.hasSufficientCoinsForDefaultPackage())) {
                throw new NotSufficientCoinsError_1.default(yield this.wallet.getBalance(), this.DEFAULT_PACKAGE_COST);
            }
            const cardPacksAggregate = CardPacksAggregate_1.default.getInstance();
            const cardPack = cardPacksAggregate.getCardPackByName(cardPackName);
            if (cardPack) {
                const defaultPackage = cardPack.createDefaultPackage();
                for (const card of defaultPackage) {
                    yield this.saveCardAsUserCardTransaction(card, cardPackName);
                }
                this.wallet.withdraw(this.DEFAULT_PACKAGE_COST);
                return defaultPackage;
            }
            else {
                throw new CardPackNotFoundError_1.default(cardPackName);
            }
        });
    }
}
exports.default = CardShop;
//# sourceMappingURL=CardShop.js.map