import * as moment from "moment";
import Blockchain from "../blockchain/core/Blockchain";
import { UserModel } from "../users/models/User";
import Wallet from "../wallet/core/Wallet";
import { UserCardTransactionModel } from "../cards/models/UserCardTransaction";
import { server } from "..";
import { BlockModel } from "../blockchain/models/Block";

export async function blockchainView(request, reply) {
  let skip = (await BlockModel.countDocuments()) - 100;
  if (skip < 0) {
    skip = 0;
  }
  let reversedChain = await BlockModel.find({})
    .sort({})
    .populate("foundByUser")
    .skip(skip)
    .limit(100)
    .exec();
  reversedChain = reversedChain.reverse();
  const html = await server["view"]("blockchain", {
    chain: reversedChain,
    moment: moment,
  });
  reply.type("text/html").send(html);
}

export async function dashboardView(request, reply) {
  const blockChainCount = await BlockModel.count({});
  const usersCount = await UserModel.count({});
  const userCardsCount = await UserCardTransactionModel.count({});

  const html = await server["view"]("dashboard", {
    blockChainCount: blockChainCount,
    usersCount: usersCount,
    userCardsCount: userCardsCount,
  });
  reply.type("text/html").send(html);
}

export async function usersView(request, reply) {
  let users = await UserModel.find();
  const wallets = {};
  await Promise.all(
    users.map(async (user) => {
      const wallet = new Wallet(user);
      wallets[user.username] = {
        cardsCount: await UserCardTransactionModel.count({ user: user }),
        balance: await wallet.getBalance(),
      };
      user["points"] = await user.getPoints();
    })
  );

  users.sort((a, b) => {
    return b["points"] - a["points"];
  });

  const html = await server["view"]("users", {
    users: users,
    wallets: wallets,
    moment: moment,
  });
  reply.type("text/html").send(html);
}
