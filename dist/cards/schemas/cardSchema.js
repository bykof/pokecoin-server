"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        imageUrl: { type: 'string' },
        subtype: { type: 'string' },
        supertype: { type: 'string' },
        number: { type: 'string' },
        artist: { type: 'string' },
        rarity: { type: 'string' },
        series: { type: 'string' },
        set: { type: 'string' },
        setCode: { type: 'string' },
        imageUrlHiRes: { type: 'string' },
        text: {
            type: 'array',
            items: { type: 'string' },
        }
    }
};
//# sourceMappingURL=cardSchema.js.map