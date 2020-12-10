import { Block, BlockModel } from "../models/Block";
import { POW_DIFFICULTY } from "../../env";
import { DocumentType } from "@typegoose/typegoose";
import { User } from "../../users/models/User";

export default class Blockchain {
  private static instance;
  _currentDifficulty: number;

  private constructor(difficulty = POW_DIFFICULTY) {
    this._currentDifficulty = difficulty;
  }

  static getInstance(): Blockchain {
    if (!this.instance) {
      this.instance = new Blockchain();
    }

    return this.instance;
  }

  async setup() {
    const lastBlock = await this.getLastBlock();

    if (!lastBlock) {
      console.log("Blockchain has no genesis block, will create one now...");
      await BlockModel.createFirstBlock();
      console.log("Genesis block was created");
    }
  }

  get currentDifficulty(): number {
    return this._currentDifficulty;
  }

  get difficultyAsZeros(): String {
    return Array(this.currentDifficulty).fill(0).join("");
  }

  async getLastBlock(): Promise<DocumentType<Block> | null> {
    const blocks = await BlockModel.find().sort({ $natural: -1 }).limit(1);
    console.log(blocks);
    if (blocks.length === 0) return null;
    return blocks[0];
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
  async calculateDifficulty(user: DocumentType<User>) {
    const points = await user.getPoints();
  }

  /**
   * Check if the given block is proper calculated and the hash does not exists in the chain
   * @param block
   */
  async blockIsValid(block: DocumentType<Block>): Promise<boolean> {
    const lastBlock = await this.getLastBlock();
    console.log(lastBlock);
    return (
      block.calculateHash().substring(0, this.currentDifficulty) ===
        this.difficultyAsZeros &&
      (lastBlock ? block.previousHash === lastBlock.hash : true)
    );
  }
}
