export default abstract class SchemaError {
  code: String
  message: String

  constructor(code: String, message: String) {
    this.code = code
    this.message = message
  }
}
