import UnauthorizedError from "../errors/UnauthorizedError";

export const unauthorizedSchema = {
  type: 'object',
  description: 'Unauthorized Request',
  properties: {
    code: { type: 'string', enum: [UnauthorizedError.name] },
    message: { type: 'string' },
  }
}
