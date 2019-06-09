import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import UserController from "./controller"
import UserNotFoundError from "./errors/UserNotFoundError";
import UserAlreadyExistsError from "./errors/UserAlreadyExistsError";

export default async function routes(
  fastify: fastify.FastifyInstance,
  options: fastify.RegisterOptions<Server, IncomingMessage, ServerResponse>
) {
  fastify.route({
    method: 'POST',
    url: '/login',
    schema: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['username', 'password'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          }
        },
        400: {
          type: 'object',
          properties: {
            code: { type: 'string', enum: ['UserNotFoundError', 'PasswordIncorrectError'] },
            message: { type: 'string' },
            username: { type: 'string' },
          }
        },
      },
      security: [{ "token": null }]
    },
    handler: UserController.login
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
        required: ['username', 'password'],
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
            code: { type: 'string', enum: ['UserAlreadyExists'] },
            message: { type: 'string' },
            username: { type: 'string' },
          }
        },
      }
    },
    handler: UserController.register
  })
}
