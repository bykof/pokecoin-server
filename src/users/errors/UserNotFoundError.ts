import SchemaError from "../../core/errors/SchemaError";

export default class UserNotFoundError extends SchemaError {
  username: String;

  constructor(username: String) {
    super(UserNotFoundError.name, `The user ${username} was not found`);
    this.username = username;
  }
}
