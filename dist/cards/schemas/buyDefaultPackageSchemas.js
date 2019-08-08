"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardSchema_1 = require("./cardSchema");
exports.responseSuccessfulSchema = {
    type: 'object',
    properties: {
        cards: { type: 'array', items: cardSchema_1.default }
    }
};
//# sourceMappingURL=buyDefaultPackageSchemas.js.map