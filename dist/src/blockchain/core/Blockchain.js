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
const Block_1 = require("../models/Block");
const env_1 = require("../../env");
class Blockchain {
    constructor(difficulty = env_1.POW_DIFFICULTY) {
        this._currentDifficulty = difficulty;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Blockchain();
        }
        return this.instance;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const lastBlock = this.getLastBlock();
            if (!lastBlock) {
                console.log('Blockchain has no genesis block, will create one now...');
                yield Block_1.BlockModel.createFirstBlock();
                console.log('Genesis block was created');
            }
        });
    }
    get currentDifficulty() {
        return this._currentDifficulty;
    }
    get difficultyAsZeros() {
        return Array(this.currentDifficulty).fill(0).join('');
    }
    getLastBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            const blocks = yield Block_1.BlockModel.find().skip((yield Block_1.BlockModel.countDocuments({})) - 1);
            if (blocks.length === 0)
                return null;
            return blocks[0];
        });
    }
    /**
     * Resets the singleton instance to a newly created blockchain instance
     */
    static resetInstance() {
        this.instance = new Blockchain();
    }
    /**
     * Calculates difficulty depending on users
     */
    calculateDifficulty(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const points = yield user.getPoints();
        });
    }
    /**
     * Check if the given block is proper calculated and the hash does not exists in the chain
     * @param block
     */
    blockIsValid(block) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastBlock = yield this.getLastBlock();
            return (block.calculateHash().substring(0, this.currentDifficulty) === this.difficultyAsZeros &&
                (lastBlock ? block.previousHash === lastBlock.hash : true));
        });
    }
}
exports.default = Blockchain;
//# sourceMappingURL=Blockchain.js.map