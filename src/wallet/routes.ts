import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import unexpectedErrorSchema from "../core/schemas/unexpectedErrorSchema"
import isAuthenticated from "../users/decorators/isAuthenticated"
import unauthorizedSchema from "../core/schemas/unauthorizedSchema"
import WalletController from "./controllers/WalletController"

export default async function routes(
  fastify: fastify.FastifyInstance,
  options: fastify.RegisterOptions<Server, IncomingMessage, ServerResponse>
) {
  fastify.route({
    method: 'GET',
    url: '/balance',
    schema: {
      response: {
        200: 'BalanceResponse#',
        401: unauthorizedSchema,
        500: unexpectedErrorSchema,
      },
      security: [{ 'token': [] }],
    },
    preHandler: isAuthenticated,
    handler: WalletController.balance,
  })
}
