import UnauthorizedError from "../errors/UnauthorizedError";

export const unauthorizedSchema = {
  type: 'object',
  description: 'Unauthorized Request',
  properties: {
    code: { type: 'string', enum: [UnauthorizedError.name] },
    message: { type: 'string' },
  }
}

export const userResponseSchema = {
  type: 'object',
  description: 'User Response',
  properties: {
    username: { type: 'string' },
    coinBalance: { type: 'integer' },
  }
}
