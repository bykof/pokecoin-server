import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import UserController from "./controller/UserController"
import * as loginSchemas from './schemas/loginSchemas'
import * as registerSchemas from './schemas/registerSchemas'
import * as userSchemas from './schemas/userSchemas'
import isAuthenticated from "./decorators/isAuthenticated"
import unexpectedErrorSchema from "../core/schemas/unexpectedErrorSchema"

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
        401: userSchemas.unauthorizedSchema,
        500: unexpectedErrorSchema,
      },
    },
    preHandler: isAuthenticated,
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
        401: userSchemas.unauthorizedSchema,
        500: unexpectedErrorSchema,
      }
    },
    handler: UserController.register
  })
}
