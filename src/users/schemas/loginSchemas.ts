import UserNotFoundError from "../errors/UserNotFoundError";
import PasswordIncorrectError from "../errors/PasswordIncorrectError";

export const bodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['username', 'password'],
}

export const responseSuccessfulSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  }
}

export const responseFailedSchema = {
  type: 'object',
  properties: {
    code: { type: 'string', enum: [UserNotFoundError.name, PasswordIncorrectError.name] },
    message: { type: 'string' },
    username: { type: 'string' },
  }
}
