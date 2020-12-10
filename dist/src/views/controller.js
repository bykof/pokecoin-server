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
exports.usersView = exports.dashboardView = exports.blockchainView = void 0;
const moment = require("moment");
const User_1 = require("../users/models/User");
const Wallet_1 = require("../wallet/core/Wallet");
const UserCardTransaction_1 = require("../cards/models/UserCardTransaction");
const __1 = require("..");
const Block_1 = require("../blockchain/models/Block");
function blockchainView(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        let skip = (yield Block_1.BlockModel.countDocuments()) - 100;
        if (skip < 0) {
            skip = 0;
        }
        let reversedChain = yield Block_1.BlockModel.find({})
            .sort({})
            .populate("foundByUser")
            .skip(skip)
            .limit(100)
            .exec();
        reversedChain = reversedChain.reverse();
        const html = yield __1.server["view"]("blockchain", {
            chain: reversedChain,
            moment: moment,
        });
        reply.type("text/html").send(html);
    });
}
exports.blockchainView = blockchainView;
function dashboardView(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const blockChainCount = yield Block_1.BlockModel.count({});
        const usersCount = yield User_1.UserModel.count({});
        const userCardsCount = yield UserCardTransaction_1.UserCardTransactionModel.count({});
        const html = yield __1.server["view"]("dashboard", {
            blockChainCount: blockChainCount,
            usersCount: usersCount,
            userCardsCount: userCardsCount,
        });
        reply.type("text/html").send(html);
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
                cardsCount: yield UserCardTransaction_1.UserCardTransactionModel.count({ user: user }),
                balance: yield wallet.getBalance(),
            };
            user["points"] = yield user.getPoints();
        })));
        users.sort((a, b) => {
            return b["points"] - a["points"];
        });
        const html = yield __1.server["view"]("users", {
            users: users,
            wallets: wallets,
            moment: moment,
        });
        reply.type("text/html").send(html);
    });
}
exports.usersView = usersView;
//# sourceMappingURL=controller.js.map