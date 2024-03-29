import * as mongoose from "mongoose";
import { BlockModel } from "./blockchain/models/Block";
import Blockchain from "./blockchain/core/Blockchain";
import { UserModel } from "./users/models/User";
import { MONGODB_URL } from "./env";

(async () => {
  const CURRENT_DIFFICULTY = 6;
  const blockchain = Blockchain.getInstance();
  blockchain._currentDifficulty = CURRENT_DIFFICULTY;
  await mongoose.connect(MONGODB_URL);
  console.log("established connection to mongodb");
  await blockchain.setup();
  let block = new BlockModel({
    foundByUser: await UserModel.findOne({ username: "bykof" }),
    timestamp: Date.now(),
    data: "Hello World",
    nonce: 1,
  });
  const lastBlock = await blockchain.getLastBlock();
  block.previousHash = lastBlock ? lastBlock.hash : "";
  console.log(`start mining... with last hash: ${block.previousHash}`);
  const hash = block.mineHash(CURRENT_DIFFICULTY);
  console.log(`Found hash: ${hash}`);
  console.log(
    JSON.stringify({
      previousHash: block.previousHash,
      data: block.data,
      timestamp: block.timestamp,
      nonce: block.nonce,
    })
  );
})();
