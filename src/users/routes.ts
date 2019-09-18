import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import unexpectedErrorSchema from "../core/schemas/unexpectedErrorSchema"
import unauthorizedSchema from "../core/schemas/unauthorizedSchema"
import UserController from './controller/UserController'
import isAuthenticated from './decorators/isAuthenticated'


export default async function routes(
  fastify: fastify.FastifyInstance,
  options: fastify.RegisterOptions<Server, IncomingMessage, ServerResponse>
) {
  fastify.route({
    method: 'POST',
    url: '/login',
    schema: {
      tags: ['Users'],
      body: 'LoginBody#',
      response: {
        200: 'LoginResponse#',
        400: 'LoginErrorResponse#',
        500: unexpectedErrorSchema,
      },
    },
    handler: UserController.login,
  })

  fastify.route({
    method: 'POST',
    url: '/register',
    schema: {
      tags: ['Users'],
      body: 'RegisterBody#',
      response: {
        200: 'RegisterResponse#',
        400: 'RegisterErrorResponse#',
        500: unexpectedErrorSchema,
      }
    },
    handler: UserController.register,
  })

  fastify.route({
    method: 'GET',
    url: '/me',
    schema: {
      tags: ['Users'],
      response: {
        200: 'User#',
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
      tags: ['Users'],
      body: 'ChangePasswordBody#',
      response: {
        201: 'ChangePasswordResponse#',
        401: unauthorizedSchema,
        500: unexpectedErrorSchema,
      },
      security: [{ 'token': [] }],
    },
    preHandler: isAuthenticated,
    handler: UserController.changePassword,
  })
}
