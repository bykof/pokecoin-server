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
const moment = require("moment");
const Blockchain_1 = require("../blockchain/core/Blockchain");
const User_1 = require("../users/models/User");
const Wallet_1 = require("../wallet/core/Wallet");
const UserCardTransaction_1 = require("../cards/models/UserCardTransaction");
function blockchainView(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const blockchain = Blockchain_1.default.getInstance();
        // Populate all users
        yield Promise.all(blockchain.chain.map((block) => block.populate('foundByUser').execPopulate()));
        const reversedChain = blockchain.chain.slice();
        reversedChain.reverse();
        reply.view('blockchain', {
            chain: reversedChain,
            moment: moment,
        });
    });
}
exports.blockchainView = blockchainView;
function usersView(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield User_1.UserModel.find();
        const wallets = {};
        yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
            const wallet = new Wallet_1.default(user);
            wallets[user.username] = {
                cards: yield UserCardTransaction_1.UserCardTransactionModel.find({ user: user }),
                balance: yield wallet.getBalance()
            };
        })));
        reply.view('users', {
            users: users,
            wallets: wallets,
            moment: moment,
        }, { async: true });
    });
}
exports.usersView = usersView;
//# sourceMappingURL=controller.js.map