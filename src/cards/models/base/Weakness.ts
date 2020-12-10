export default class Weakness {
  type: String;
  value: String;

  constructor(data) {
    for (const key in data) {
      this[key] = data[key];
    }
  }
}
