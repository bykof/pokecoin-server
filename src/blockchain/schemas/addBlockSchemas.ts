import BlockIsNotValidError from "../errors/BlockIsNotValidError";
import blockSchema from "./blockSchema";

export const bodySchema = {
  type: 'object',
  properties: {
    previousHash: { type: 'string' },
    data: { type: 'string' },
    timestamp: { type: 'integer' },
    nonce: { type: 'integer' },
  },
  required: ['previousHash', 'data', 'timestamp', 'nonce'],
}

export const responseFailedSchema = {
  type: 'object',
  properties: {
    code: { type: 'string', enum: [BlockIsNotValidError.name,] },
    message: { type: 'string' },
    block: blockSchema,
    lastBlock: blockSchema,
  }
}

export const responseSuccessfulSchema = {
  type: 'object',
  properties: {
    block: blockSchema,
  }
}
