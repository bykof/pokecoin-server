import { FastifyInstance } from "fastify";
import transactionSchema from "./transactionSchema";
import balanceResponse from "./balanceResponse";

export function init(fastify: FastifyInstance) {
  fastify.addSchema(transactionSchema)
  fastify.addSchema(balanceResponse)
}
