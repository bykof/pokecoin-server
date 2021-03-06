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
exports.BlockModel = exports.Block = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const crypto = require("crypto");
const User_1 = require("../../users/models/User");
const UserSetup_1 = require("../../users/core/UserSetup");
class Block {
    constructor() {
        this.nonce = 1;
    }
    calculateHash() {
        const information = this.previousHash +
            this.timestamp.toString() +
            this.data +
            this.nonce.toString();
        return crypto.createHash("sha256").update(information).digest("hex");
    }
    mineHash(difficulty) {
        const difficultyAsZeros = new Array(difficulty).fill(0).join("");
        while (this.calculateHash().substring(0, difficulty) !== difficultyAsZeros) {
            this.nonce++;
            // If we have gone through all nonce so we get to 0
            // than we reset the timestamp and nonce
            if (this.nonce === Number.MAX_SAFE_INTEGER) {
                this.timestamp = Date.now();
                this.nonce = 0;
            }
        }
        return this.calculateHash();
    }
    static createFromRequest(request) {
        const newBlock = new this();
        newBlock.previousHash = request.body.previousHash;
        newBlock.data = request.body.data;
        newBlock.timestamp = request.body.timestamp;
        newBlock.nonce = request.body.nonce;
        newBlock.hash = newBlock.calculateHash();
        newBlock.foundByUser = request.user;
        return newBlock;
    }
    static createFirstBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlock = new this();
            newBlock.previousHash = "";
            newBlock.data = "Genesis Block #1";
            newBlock.timestamp = Date.now();
            newBlock.nonce = 0;
            newBlock.hash = newBlock.calculateHash();
            newBlock.foundByUser = yield User_1.UserModel.findOne({
                username: UserSetup_1.DEFAULT_USERNAME,
            });
            yield newBlock.save();
            return newBlock;
        });
    }
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Block.prototype, "hash", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Block.prototype, "previousHash", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Block.prototype, "data", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Block.prototype, "timestamp", void 0);
__decorate([
    typegoose_1.prop({ default: 1 }),
    __metadata("design:type", Number)
], Block.prototype, "nonce", void 0);
__decorate([
    typegoose_1.prop({ ref: "User" }),
    __metadata("design:type", Object)
], Block.prototype, "foundByUser", void 0);
exports.Block = Block;
exports.BlockModel = typegoose_1.getModelForClass(Block);
//# sourceMappingURL=Block.js.map