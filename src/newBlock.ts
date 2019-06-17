import * as mongoose from 'mongoose'
import { BlockModel } from './blockchain/models/Block';
import Blockchain from './blockchain/core/Blockchain';
import { UserModel } from './users/models/User';

(async () => {
  const blockchain = Blockchain.getInstance()
  await mongoose.connect('mongodb://localhost/pokecoin', { useNewUrlParser: true, useCreateIndex: true })
  await blockchain.setup()
  let block = new BlockModel({foundByUser: UserModel.findOne({username: 'bykof'}), timestamp: Date.now(), data: 'Hello World', nonce: 1})
  block.previousHash = blockchain.lastBlock ? blockchain.lastBlock.hash : ''
  block.mineHash(4)
  console.log(
    JSON.stringify({
      previousHash: block.previousHash,
      data: block.data,
      timestamp: block.timestamp,
      nonce: block.nonce
    })
  )
})()
