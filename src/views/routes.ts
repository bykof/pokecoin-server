import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import { blockchainView, usersView, dashboardView } from './controller'

export default async function routes(
  fastify: fastify.FastifyInstance,
  options: fastify.RegisterOptions<Server, IncomingMessage, ServerResponse>
) {
  fastify.route({
    method: 'GET',
    url: '/blockchain',
    schema: {
      tags: ['Views'],
    },
    handler: blockchainView,
  })

  fastify.route({
    method: 'GET',
    url: '/users',
    schema: {
      tags: ['Views'],
    },
    handler: usersView,
  })

  fastify.route({
    method: 'GET',
    url: '/dashboard',
    schema: {
      tags: ['Views'],
    },
    handler: dashboardView,
  })
}
