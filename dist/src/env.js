"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/pokecoin';
exports.PORT = parseInt(process.env.PORT) || 3000;
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.POW_DIFFICULTY = parseInt(process.env.POW_DIFFICULTY) || 6;
//# sourceMappingURL=env.js.map