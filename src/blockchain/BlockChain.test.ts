import BlockChain from './BlockChain'
import Block from './models/Block'
import BlockIsNotValidError from './errors/BlockIsNotValidError';

test('test validateBlockChain to be truthy', () => {
  const blockChain = new BlockChain()
  blockChain._currentDifficulty = 1
  const block1 = new Block({ data: 'Text', timestamp: Date.now(), previousHash: '' })
  block1.hash = block1.mineHash(blockChain.currentDifficulty)
  blockChain.addBlock(block1)

  const block2 = new Block({ data: 'Text', timestamp: Date.now(), previousHash: block1.hash })
  block2.hash = block2.mineHash(blockChain.currentDifficulty)
  blockChain.addBlock(block2)
  expect(blockChain.validateBlockChain()).toBeTruthy()
})

test('test validateBlockChain to be falsy', () => {
  const blockChain = new BlockChain()
  const block1 = new Block({ data: 'Text', timestamp: Date.now(), previousHash: '' })
  block1.hash = block1.mineHash(blockChain.currentDifficulty)
  blockChain.addBlock(block1)

  const block2 = new Block({ data: 'Text', timestamp: Date.now(), previousHash: block1.hash })
  block2.hash = block2.mineHash(blockChain.currentDifficulty)
  blockChain.addBlock(block2)
  // change the hash
  block2.hash = '1234'
  expect(blockChain.validateBlockChain()).toBeFalsy()

  block2.hash = block2.calculateHash()
  block2.previousHash = '123'
  expect(blockChain.validateBlockChain()).toBeFalsy()
})

test('test addBlock to be truthy', () => {
  const blockChain = new BlockChain()
  const block1 = new Block({ data: 'Text', timestamp: Date.now(), previousHash: '' })
  block1.hash = block1.mineHash(blockChain.currentDifficulty)
  blockChain.addBlock(block1)

  const block2 = new Block({ data: 'Text', timestamp: Date.now(), previousHash: block1.hash })
  block2.hash = block2.mineHash(blockChain.currentDifficulty)
  blockChain.addBlock(block2)
})


test('test addBlock to be falsy', () => {
  const blockChain = new BlockChain()
  const block1 = new Block({ data: 'Text', timestamp: Date.now(), previousHash: '' })
  block1.hash = block1.mineHash(blockChain.currentDifficulty)
  blockChain.addBlock(block1)

  const block2 = new Block({ data: 'Text', timestamp: Date.now(), previousHash: block1.hash })
  block2.hash = '1234'
  try {
    blockChain.addBlock(block2)
  } catch (error) {
    expect(error.code).toBe(BlockIsNotValidError.name)
  }
})
