"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Attack {
    constructor(data) {
        for (const key in data) {
            this[key] = data[key];
        }
    }
}
exports.default = Attack;
//# sourceMappingURL=Attack.js.map