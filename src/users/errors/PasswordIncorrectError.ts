import SchemaError from "../../core/errors/SchemaError";

export default class PasswordIncorrectError extends SchemaError {
  username: String;

  constructor(username: String) {
    super(
      PasswordIncorrectError.name,
      `The password for the user ${username} was incorrect`
    );
    this.username = username;
  }
}
