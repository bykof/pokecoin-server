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
const typegoose_1 = require("typegoose");
const crypto = require("crypto");
const User_1 = require("../../users/models/User");
class Block extends typegoose_1.Typegoose {
    constructor() {
        super(...arguments);
        this.nonce = 1;
    }
    calculateHash() {
        const information = (this.previousHash +
            this.timestamp.toString() +
            this.data +
            this.nonce.toString());
        return crypto.createHash('sha256').update(information).digest('hex');
    }
    mineHash(difficulty) {
        const difficultyAsZeros = new Array(difficulty).fill(0).join('');
        while (this.calculateHash().substring(0, difficulty) !== difficultyAsZeros) {
            this.nonce++;
            // If we have gone through all nonce so we get to 0 than we update the timestamp
            if (this.nonce === Number.MAX_SAFE_INTEGER) {
                this.timestamp = Date.now();
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
    typegoose_1.prop({ ref: User_1.User }),
    __metadata("design:type", Object)
], Block.prototype, "foundByUser", void 0);
__decorate([
    typegoose_1.instanceMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], Block.prototype, "calculateHash", null);
__decorate([
    typegoose_1.instanceMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", String)
], Block.prototype, "mineHash", null);
__decorate([
    typegoose_1.staticMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], Block, "createFromRequest", null);
exports.Block = Block;
exports.BlockModel = new Block().getModelForClass(Block);
//# sourceMappingURL=Block.js.map