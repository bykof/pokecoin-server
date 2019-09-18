import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import unexpectedErrorSchema from "../core/schemas/unexpectedErrorSchema"
import isAuthenticated from "../users/decorators/isAuthenticated"
import unauthorizedSchema from "../core/schemas/unauthorizedSchema"
import BlockchainController from "./controller/BlockchainController"

export default async function routes(
  fastify: fastify.FastifyInstance,
  options: fastify.RegisterOptions<Server, IncomingMessage, ServerResponse>
) {
  fastify.route({
    method: 'POST',
    url: '/blocks',
    schema: {
      tags: ['Blockchain'],
      body: 'AddBlockBody#',
      response: {
        200: 'AddBlockResponse#',
        400: 'AddBlockErrorResponse#',
        401: unauthorizedSchema,
        500: unexpectedErrorSchema,
      },
      security: [{ 'token': [] }],
    },
    preHandler: isAuthenticated,
    handler: BlockchainController.addBlock,
  })

  fastify.route({
    method: 'GET',
    url: '/lastBlock',
    schema: {
      tags: ['Blockchain'],
      response: {
        200: 'Block#',
        401: unauthorizedSchema,
        500: unexpectedErrorSchema,
      },
    },
    handler: BlockchainController.lastBlock,
  })
}
