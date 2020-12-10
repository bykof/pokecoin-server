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
exports.DEFAULT_USERNAME = void 0;
const User_1 = require("../models/User");
exports.DEFAULT_USERNAME = "bykof";
const DEFAULT_PASSWORD = "f1910feebe29a55cab5f5b83a204c1c5b0cf0e9adb9218598608aee813a55663";
class UserSetup {
    static setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield User_1.UserModel.findOne({ username: exports.DEFAULT_USERNAME });
            if (foundUser) {
                return;
            }
            const defaultUser = new User_1.UserModel();
            defaultUser.username = exports.DEFAULT_USERNAME;
            defaultUser.password = DEFAULT_PASSWORD;
            yield defaultUser.save();
        });
    }
}
exports.default = UserSetup;
//# sourceMappingURL=UserSetup.js.map