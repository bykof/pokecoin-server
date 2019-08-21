import * as mongoose from 'mongoose'
import { BlockModel } from './blockchain/models/Block';
import Blockchain from './blockchain/core/Blockchain';
import { UserModel } from './users/models/User';
import { setupDatabase } from '.';

(async () => {
  const blockchain = Blockchain.getInstance()
  await setupDatabase()
  await blockchain.setup()
  let block = new BlockModel({foundByUser: (await UserModel.findOne({username: 'bykof'})), timestamp: Date.now(), data: 'Hello World', nonce: 1})
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
