import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import unexpectedErrorSchema from "../core/schemas/unexpectedErrorSchema"
import unauthorizedSchema from "../core/schemas/unauthorizedSchema"
import UserController from './controller/UserController'
import * as loginSchemas from './schemas/loginSchemas'
import * as registerSchemas from './schemas/registerSchemas'
import * as changePasswordSchemas from './schemas/changePasswordSchemas'
import isAuthenticated from './decorators/isAuthenticated'
import userSchema from "./schemas/userSchema"

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
        500: unexpectedErrorSchema,
      },
    },
    handler: UserController.login,
  })

  fastify.route({
    method: 'POST',
    url: '/register',
    schema: {
      body: registerSchemas.bodySchema,
      response: {
        200: registerSchemas.responseSuccessfulSchema,
        400: registerSchemas.responseFailedSchema,
        500: unexpectedErrorSchema,
      }
    },
    handler: UserController.register,
  })

  fastify.route({
    method: 'GET',
    url: '/me',
    schema: {
      response: {
        200: userSchema,
        401: unauthorizedSchema,
        500: unexpectedErrorSchema,
      },
      security: [{ 'token': [] }],
    },
    preHandler: isAuthenticated,
    handler: UserController.me,
  })

  fastify.route({
    method: 'POST',
    url: '/changePassword',
    schema: {
      body: changePasswordSchemas.bodySchema,
      response: {
        201: changePasswordSchemas.responseSuccessfulSchema,
        401: unauthorizedSchema,
        500: unexpectedErrorSchema,
      },
      security: [{ 'token': [] }],
    },
    preHandler: isAuthenticated,
    handler: UserController.changePassword,
  })
}
