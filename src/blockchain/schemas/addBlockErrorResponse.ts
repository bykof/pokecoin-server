import BlockIsNotValidError from "../errors/BlockIsNotValidError";

export default {
  $id: "AddBlockErrorResponse",
  title: "AddBlockErrorResponse",
  description: "The error response schema for failed block adding",
  type: "object",
  properties: {
    code: { type: "string", enum: [BlockIsNotValidError.name] },
    message: { type: "string" },
    block: { $ref: "Block#" },
    lastBlock: { $ref: "Block#" },
  },
};
