"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const UnauthorizedError_1 = require("../../core/errors/UnauthorizedError");
function isAuthenticated(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = request.headers["token"];
        const user = yield User_1.UserModel.getUserByJSONWebToken(token);
        if (!token || !user) {
            return reply.status(401).send(new UnauthorizedError_1.default());
        }
        else {
            request.user = user;
            return;
        }
    });
}
exports.default = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map