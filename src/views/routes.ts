import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import { blockchainView, usersView } from './controller'

export default async function routes(
  fastify: fastify.FastifyInstance,
  options: fastify.RegisterOptions<Server, IncomingMessage, ServerResponse>
) {
  fastify.route({
    method: 'GET',
    url: '/blockchain',
    handler: blockchainView,
  })

  fastify.route({
    method: 'GET',
    url: '/users',
    handler: usersView,
  })
}
