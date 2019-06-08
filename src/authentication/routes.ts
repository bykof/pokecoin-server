import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import User from './models/User'

export default async function routes(
  fastify: fastify.FastifyInstance,
  options: fastify.RegisterOptions<Server, IncomingMessage, ServerResponse>
) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: {
        name: { type: 'string' },
        test: { type: 'integer' },
      },
      response: {
        200: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    },
    handler: async (request, reply) => {
      const user = await User.find()
      reply.send(user)
    }
  })
}
