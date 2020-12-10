import { FastifyInstance } from "fastify";
import notFoundSchema from "./notFoundSchema";
import pageParameterSchema from "./pageParameterSchema";
import unauthorizedSchema from "./unauthorizedSchema";
import unexpectedErrorSchema from "./unexpectedErrorSchema";

export function init(fastify: FastifyInstance) {
  fastify.addSchema(notFoundSchema);
  fastify.addSchema(pageParameterSchema);
  fastify.addSchema(unauthorizedSchema);
  fastify.addSchema(unexpectedErrorSchema);
}
