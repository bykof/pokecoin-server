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
const Transaction_1 = require("../models/Transaction");
class Wallet {
    constructor(user) {
        this.DEFAULT_REWARD = 1;
        this.user = user;
    }
    /**
     * Get the balance of a user
     * It will sum the amount of all transactions
     */
    getBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = yield Transaction_1.TransactionModel.find({ user: this.user });
            return transactions.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
        });
    }
    /**
     * Add a reward for current wallet for a found block
     * @param block the block which was found
     */
    addReward(block) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTransaction = yield new Transaction_1.TransactionModel({
                amount: this.DEFAULT_REWARD,
                timestamp: Date.now(),
                rewardOfBlock: block,
                user: this.user,
            }).save();
            return newTransaction;
        });
    }
    /**
     * Withdraw an amount from users balance account
     * amount should be a positive integer
     * @param amount
     */
    withdraw(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTransaction = yield new Transaction_1.TransactionModel({
                amount: -amount,
                timestamp: Date.now(),
                user: this.user,
            }).save();
            return newTransaction;
        });
    }
}
exports.default = Wallet;
//# sourceMappingURL=Wallet.js.map