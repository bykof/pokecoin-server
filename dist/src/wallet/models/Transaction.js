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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = exports.Transaction = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class Transaction {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Transaction.prototype, "timestamp", void 0);
__decorate([
    typegoose_1.prop({ ref: "Block" }),
    __metadata("design:type", Object)
], Transaction.prototype, "rewardOfBlock", void 0);
__decorate([
    typegoose_1.prop({ ref: "User" }),
    __metadata("design:type", Object)
], Transaction.prototype, "user", void 0);
exports.Transaction = Transaction;
exports.TransactionModel = typegoose_1.getModelForClass(Transaction);
//# sourceMappingURL=Transaction.js.map