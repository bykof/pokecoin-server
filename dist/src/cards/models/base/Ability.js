"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ability {
    constructor(data) {
        for (const key in data) {
            this[key] = data[key];
        }
    }
}
exports.default = Ability;
//# sourceMappingURL=Ability.js.map