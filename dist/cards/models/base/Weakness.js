"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Weakness {
    constructor(data) {
        for (const key in data) {
            this[key] = data[key];
        }
    }
}
exports.default = Weakness;
//# sourceMappingURL=Weakness.js.map