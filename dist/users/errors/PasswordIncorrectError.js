"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaError_1 = require("../../core/errors/SchemaError");
class PasswordIncorrectError extends SchemaError_1.default {
    constructor(username) {
        super(PasswordIncorrectError.name, `The password for the user ${username} was incorrect`);
        this.username = username;
    }
}
exports.default = PasswordIncorrectError;
//# sourceMappingURL=PasswordIncorrectError.js.map