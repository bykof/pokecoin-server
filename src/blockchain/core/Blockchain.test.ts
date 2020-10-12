import Blockchain from './Blockchain'
import { BlockModel } from '../models/Block'

afterEach(() => {
  Blockchain.resetInstance()
})

test('test blockchain singleton', () => {
  const blockchain = Blockchain.getInstance()
  blockchain._currentDifficulty = -1

  const blockchain2 = Blockchain.getInstance()
  expect(blockchain2._currentDifficulty).toBe(-1)
})
