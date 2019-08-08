"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SchemaError_1 = require("./SchemaError");
class UnauthorizedError extends SchemaError_1.default {
    constructor() {
        super(UnauthorizedError.name, `Unauthorized request`);
    }
}
exports.default = UnauthorizedError;
//# sourceMappingURL=UnauthorizedError.js.map