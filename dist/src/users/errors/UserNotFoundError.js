"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaError_1 = require("../../core/errors/SchemaError");
class UserNotFoundError extends SchemaError_1.default {
    constructor(username) {
        super(UserNotFoundError.name, `The user ${username} was not found`);
        this.username = username;
    }
}
exports.default = UserNotFoundError;
//# sourceMappingURL=UserNotFoundError.js.map