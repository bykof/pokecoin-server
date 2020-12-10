import SchemaError from "./SchemaError";

export default class UnauthorizedError extends SchemaError {
  constructor() {
    super(UnauthorizedError.name, `Unauthorized request`);
  }
}
