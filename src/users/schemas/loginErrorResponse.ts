import UserNotFoundError from "../errors/UserNotFoundError";
import PasswordIncorrectError from "../errors/PasswordIncorrectError";

export default {
  $id: 'LoginErrorResponse',
  title: 'LoginErrorResponse',
  description: 'The error schema if login failed',
  type: 'object',
  properties: {
    code: { type: 'string', enum: [UserNotFoundError.name, PasswordIncorrectError.name] },
    message: { type: 'string' },
    username: { type: 'string' },
  }
}
