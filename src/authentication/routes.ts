import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import UserController from "./controller"

export default async function routes(
  fastify: fastify.FastifyInstance,
  options: fastify.RegisterOptions<Server, IncomingMessage, ServerResponse>
) {
  fastify.route({
    method: 'GET',
    url: '/login',
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          }
        }
      }
    },
    handler: new UserController().login
  })

  fastify.route({
    method: 'POST',
    url: '/register',
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            username: { type: 'string' },
          }
        },
        400: {
          type: 'object',
          properties: {
            code: { type: 'string' },
            message: { type: 'string' },
            payload: { type: 'object' }
          }
        }
      }
    },
    handler: new UserController().register
  })
}
