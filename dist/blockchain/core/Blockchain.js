"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = require("../models/Block");
class Blockchain {
    constructor(difficulty = 4) {
        this.chain = [];
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
            yield this.updateChain();
        });
    }
    get currentDifficulty() {
        return this._currentDifficulty;
    }
    get difficultyAsZeros() {
        return Array(this.currentDifficulty).fill(0).join('');
    }
    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    /**
     * Resets the singleton instance to a newly created blockchain instance
     */
    static resetInstance() {
        this.instance = new Blockchain();
    }
    /**
     * Validates if the blockchain is correct
     */
    validateBlockChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.calculateHash() !== currentBlock.hash) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
    /**
     * Check if the given block is proper calculated and the hash does not exists in the chain
     * @param block
     */
    blockIsValid(block) {
        return (block.calculateHash().substring(0, this.currentDifficulty) === this.difficultyAsZeros &&
            (this.lastBlock ? block.previousHash === this.lastBlock.hash : true));
    }
    /**
     * Updates the chain with new blocks from the database
     * @param newBlock
     */
    updateChain() {
        return __awaiter(this, void 0, void 0, function* () {
            this.chain = yield Block_1.BlockModel.find();
        });
    }
}
exports.default = Blockchain;
//# sourceMappingURL=Blockchain.js.map