"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaError_1 = require("../../core/errors/SchemaError");
class UserAlreadyExistsError extends SchemaError_1.default {
    constructor(username) {
        super(UserAlreadyExistsError.name, `The user ${username} already exists`);
        this.username = username;
    }
}
exports.default = UserAlreadyExistsError;
//# sourceMappingURL=UserAlreadyExistsError.js.map