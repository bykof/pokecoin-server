"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
exports.default = {
    $id: "UnauthorizedError",
    title: "UnauthorizedError",
    type: "object",
    description: "Unauthorized Request",
    properties: {
        code: { type: "string", enum: [UnauthorizedError_1.default.name] },
        message: { type: "string" },
    },
};
//# sourceMappingURL=unauthorizedSchema.js.map