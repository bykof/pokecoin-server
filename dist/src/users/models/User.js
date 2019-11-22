"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const typegoose_1 = require("@typegoose/typegoose");
const crypto = require("crypto");
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../../env");
const Wallet_1 = require("../../wallet/core/Wallet");
const UserCardTransaction_1 = require("../../cards/models/UserCardTransaction");
class User {
    static hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
    static decodeJSONWebToken(token) {
        try {
            // TODO: change secret
            return jsonwebtoken_1.verify(token, 'secret');
        }
        catch (error) {
            // Since I know that the error will be an unverified jwt token
            // i can return null and don't log an error
            return null;
        }
        return null;
    }
    static getUserByJSONWebToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = this.decodeJSONWebToken(token);
            if (decodedToken) {
                return yield this.findOne({ username: decodedToken['username'] });
            }
        });
    }
    generateJSONWebToken() {
        // TODO: change secret
        return jsonwebtoken_1.sign({ username: this.username }, env_1.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
    }
    getPoints() {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = new Wallet_1.default(this);
            const userCardTransactions = yield UserCardTransaction_1.UserCardTransactionModel.find({ user: this });
            const balance = yield wallet.getBalance();
            return balance + (userCardTransactions.length * 6);
        });
    }
}
__decorate([
    typegoose_1.prop({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
exports.User = User;
exports.UserModel = typegoose_1.getModelForClass(User);
//# sourceMappingURL=User.js.map