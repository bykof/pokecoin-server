import { FastifyInstance } from "fastify";
import blockSchema from "./blockSchema";
import addBlockBody from "./addBlockBody";
import addBlockResponse from "./addBlockResponse";
import addBlockErrorResponse from "./addBlockErrorResponse";

export function init(fastify: FastifyInstance) {
  fastify.addSchema(blockSchema)

  fastify.addSchema(addBlockBody)
  fastify.addSchema(addBlockResponse)
  fastify.addSchema(addBlockErrorResponse)
}
