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
const Blockchain_1 = require("../core/Blockchain");
const Block_1 = require("../models/Block");
const BlockIsNotValidError_1 = require("../errors/BlockIsNotValidError");
const lockfile = require("lockfile");
const Wallet_1 = require("../../wallet/core/Wallet");
const User_1 = require("../../users/models/User");
const utils_1 = require("../../core/utils");
class BlockchainController {
    /**
     * Validate a block and add it to the blockchain
     *
     * @param request
     * @param reply
     */
    static addBlock(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            lockfile.lock(BlockchainController.ADD_BLOCKCHAIN_BLOCK_LOCK, {
                wait: 1000 * 30,
            }, () => __awaiter(this, void 0, void 0, function* () {
                if (!utils_1.checkIfBrowser(request.headers["user-agent"])) {
                    return reply
                        .status(400)
                        .send({ message: "please no automated scripts!" });
                }
                const blockchain = Blockchain_1.default.getInstance();
                const wallet = new Wallet_1.default(request.user);
                const newBlock = Block_1.BlockModel.createFromRequest(request);
                const blockIsValid = yield blockchain.blockIsValid(newBlock);
                if (!blockIsValid) {
                    const lastBlock = yield blockchain.getLastBlock();
                    lockfile.unlock(BlockchainController.ADD_BLOCKCHAIN_BLOCK_LOCK, () => { });
                    return reply
                        .status(400)
                        .send(new BlockIsNotValidError_1.default(newBlock, lastBlock));
                }
                else {
                    yield newBlock.save();
                    const newTransaction = yield wallet.addReward(newBlock);
                    lockfile.unlock(BlockchainController.ADD_BLOCKCHAIN_BLOCK_LOCK, () => { });
                    return reply.send({
                        block: newBlock,
                        transaction: newTransaction,
                    });
                }
            }));
        });
    }
    /**
     * Get the last block of the blockchain
     * @param request
     * @param reply
     */
    static lastBlock(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const blockchain = Blockchain_1.default.getInstance();
            const lastBlock = yield blockchain.getLastBlock();
            lastBlock.foundByUser = yield User_1.UserModel.findById(lastBlock.foundByUser);
            return reply.send(lastBlock);
        });
    }
    /**
     * Get the current POW difficulty of the blockchain
     * @param requeest
     * @param reply
     */
    static currentDifficulty(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const blockchain = Blockchain_1.default.getInstance();
            return reply.send(blockchain.currentDifficulty);
        });
    }
}
exports.default = BlockchainController;
BlockchainController.ADD_BLOCKCHAIN_BLOCK_LOCK = "addBlockchainBlock.lock";
//# sourceMappingURL=BlockchainController.js.map