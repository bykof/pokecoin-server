import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import unexpectedErrorSchema from "../core/schemas/unexpectedErrorSchema"
import isAuthenticated from "../users/decorators/isAuthenticated"
import unauthorizedSchema from "../core/schemas/unauthorizedSchema"
import BlockchainController from "./controller/BlockchainController"
import * as addBlockSchemas from "./schemas/addBlockSchemas"

export default async function routes(
  fastify: fastify.FastifyInstance,
  options: fastify.RegisterOptions<Server, IncomingMessage, ServerResponse>
) {
  fastify.route({
    method: 'POST',
    url: '/blocks',
    schema: {
      body: addBlockSchemas.bodySchema,
      response: {
        200: addBlockSchemas.responseSuccessfulSchema,
        400: addBlockSchemas.responseFailedSchema,
        401: unauthorizedSchema,
        500: unexpectedErrorSchema,
      },
      security: [{ 'token': [] }],
    },
    preHandler: isAuthenticated,
    handler: BlockchainController.addBlock,
  })
}
