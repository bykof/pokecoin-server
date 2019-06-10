import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import UserController from "./controller"
import * as loginSchemas from './schemas/loginSchemas'
import * as registerSchemas from './schemas/registerSchemas'

export default async function routes(
  fastify: fastify.FastifyInstance,
  options: fastify.RegisterOptions<Server, IncomingMessage, ServerResponse>
) {
  fastify.route({
    method: 'POST',
    url: '/login',
    schema: {
      body: loginSchemas.bodySchema,
      response: {
        200: loginSchemas.responseSuccessfulSchema,
        400: loginSchemas.responseFailedSchema,
      },
      security: [{ "token": null }]
    },
    handler: UserController.login
  })

  fastify.route({
    method: 'POST',
    url: '/register',
    schema: {
      body: registerSchemas.bodySchema,
      response: {
        200: registerSchemas.responseSuccessfulSchema,
        400: registerSchemas.responseFailedSchema,
      }
    },
    handler: UserController.register
  })
}
