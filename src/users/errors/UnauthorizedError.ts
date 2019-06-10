import SchemaError from "../../core/errors/SchemaError";

export default class UnauthorizedError extends SchemaError {
  constructor() {
    super(UnauthorizedError.name, `Unauthorized request`)
  }
}
