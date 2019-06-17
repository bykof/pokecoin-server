import UnauthorizedError from "../errors/UnauthorizedError";

export default {
  type: 'object',
  description: 'Unauthorized Request',
  properties: {
    code: { type: 'string', enum: [UnauthorizedError.name] },
    message: { type: 'string' },
  }
}
