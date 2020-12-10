import SchemaError from "../../core/errors/SchemaError";

export default class UserAlreadyExistsError extends SchemaError {
  username: String;

  constructor(username: String) {
    super(UserAlreadyExistsError.name, `The user ${username} already exists`);
    this.username = username;
  }
}
