import userSchema from "../../users/schemas/userSchema";

export default {
  type: 'object',
  properties: {
    hash: { type: 'string' },
    previousHash: { type: 'string' },
    data: { type: 'string' },
    timestamp: { type: 'integer' },
    nonce: { type: 'integer' },
    foundByUser: userSchema,
  }
}
