export default abstract class SchemaError {
  code: string;
  message: string;
  name: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.name = code;
    this.message = message;
  }
}
