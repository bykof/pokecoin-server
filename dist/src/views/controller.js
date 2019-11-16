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
const moment = require("moment");
const Blockchain_1 = require("../blockchain/core/Blockchain");
const User_1 = require("../users/models/User");
const Wallet_1 = require("../wallet/core/Wallet");
const UserCardTransaction_1 = require("../cards/models/UserCardTransaction");
const __1 = require("..");
function blockchainView(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const blockchain = Blockchain_1.default.getInstance();
        yield Promise.all(blockchain.chain.map((block) => __awaiter(this, void 0, void 0, function* () {
            block.foundByUser = yield User_1.UserModel.findById(block.foundByUser);
        })));
        const reversedChain = blockchain.chain.slice();
        reversedChain.reverse();
        const html = yield __1.server['view']('blockchain', {
            chain: reversedChain,
            moment: moment,
        });
        reply.type('text/html').send(html);
    });
}
exports.blockchainView = blockchainView;
function dashboardView(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const blockchain = Blockchain_1.default.getInstance();
        const users = yield User_1.UserModel.find();
        const userCards = yield UserCardTransaction_1.UserCardTransactionModel.find();
        const html = yield __1.server['view']('dashboard', {
            blockchain: blockchain,
            users: users,
            userCards: userCards,
            moment: moment,
        });
        reply.type('text/html').send(html);
    });
}
exports.dashboardView = dashboardView;
function usersView(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        let users = yield User_1.UserModel.find();
        const wallets = {};
        yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
            const wallet = new Wallet_1.default(user);
            wallets[user.username] = {
                cards: yield UserCardTransaction_1.UserCardTransactionModel.find({ user: user }),
                balance: yield wallet.getBalance()
            };
            user['points'] = yield user.getPoints();
            console.log(user['points']);
        })));
        users.sort((a, b) => {
            return a['points'] - b['points'];
        });
        const html = yield __1.server['view']('users', {
            users: users,
            wallets: wallets,
            moment: moment,
        });
        reply.type('text/html').send(html);
    });
}
exports.usersView = usersView;
//# sourceMappingURL=controller.js.map