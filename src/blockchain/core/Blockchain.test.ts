import Blockchain from './Blockchain'
import { BlockModel } from '../models/Block'

afterEach(() => {
  Blockchain.resetInstance()
})

test('test validateBlockChain to be truthy', () => {
  const blockChain = Blockchain.getInstance()
  blockChain._currentDifficulty = 1
  const block1 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: '' })
  block1.hash = block1.mineHash(blockChain.currentDifficulty)
  blockChain.chain.push(block1)

  const block2 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: block1.hash })
  block2.hash = block2.mineHash(blockChain.currentDifficulty)
  blockChain.chain.push(block2)
  expect(blockChain.validateBlockChain()).toBeTruthy()
})

test('test validateBlockChain to be falsy', () => {
  const blockChain = Blockchain.getInstance()
  blockChain._currentDifficulty = 1
  const block1 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: '' })
  block1.hash = block1.mineHash(blockChain.currentDifficulty)
  blockChain.chain.push(block1)

  const block2 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: block1.hash })
  block2.hash = block2.mineHash(blockChain.currentDifficulty)
  blockChain.chain.push(block2)
  // change the hash
  block2.hash = '1234'
  expect(blockChain.validateBlockChain()).toBeFalsy()

  block2.hash = block2.calculateHash()
  block2.previousHash = '123'
  expect(blockChain.validateBlockChain()).toBeFalsy()
})

test('test addBlock', () => {
  const blockChain = Blockchain.getInstance()
  blockChain._currentDifficulty = 1
  const block1 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: '' })
  block1.hash = block1.mineHash(blockChain.currentDifficulty)
  blockChain.chain.push(block1)

  const block2 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: block1.hash })
  block2.hash = block2.mineHash(blockChain.currentDifficulty)
  blockChain.chain.push(block2)

  expect(blockChain.chain).toStrictEqual([block1, block2])
})

test('test blockchain singleton', () => {
  const blockchain = Blockchain.getInstance()
  blockchain._currentDifficulty = -1

  const blockchain2 = Blockchain.getInstance()
  expect(blockchain2._currentDifficulty).toBe(-1)
})

test('test blockchain blockIsValid to be truthy', () => {
  const blockchain = Blockchain.getInstance()
  blockchain._currentDifficulty = 1
  const block1 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: '' })
  block1.hash = block1.mineHash(blockchain.currentDifficulty)
  blockchain.chain.push(block1)

  const block2 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: block1.hash })
  block2.mineHash(blockchain.currentDifficulty)
  expect(blockchain.blockIsValid(block2)).toBeTruthy()
})


test('test blockchain blockIsValid to be falsy when the previous hash is not correct', () => {
  const blockchain = Blockchain.getInstance()
  blockchain._currentDifficulty = 1
  const block1 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: '' })
  block1.hash = block1.mineHash(blockchain.currentDifficulty)
  blockchain.chain.push(block1)

  const block2 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: 'test' })
  expect(blockchain.blockIsValid(block2)).toBeFalsy()
})


test('test blockchain blockIsValid to be falsy when the POW is not correct', () => {
  const blockchain = Blockchain.getInstance()
  blockchain._currentDifficulty = 1
  const block1 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: '' })
  block1.hash = block1.mineHash(blockchain.currentDifficulty)
  blockchain.chain.push(block1)

  const block2 = new BlockModel({ data: 'Text', timestamp: Date.now(), previousHash: block1.hash })
  expect(blockchain.blockIsValid(block2)).toBeFalsy()
})
