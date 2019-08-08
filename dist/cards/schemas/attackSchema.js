"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        cost: {
            type: 'array',
            items: { type: 'string' },
        },
        convertedEnergyCost: { type: 'integer' },
        damage: { type: 'string' },
        text: { type: 'string' },
    },
};
//# sourceMappingURL=attackSchema.js.map