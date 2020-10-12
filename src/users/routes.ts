import UserController from './controller/UserController';
import isAuthenticated from './decorators/isAuthenticated';

export default async function routes(fastify) {
  fastify.route({
    method: 'POST',
    url: '/login',
    schema: {
      tags: ['Users'],
      body: { $ref: 'LoginBody#' },
      response: {
        200: { $ref: 'LoginResponse#' },
        400: { $ref: 'LoginErrorResponse#' },
        500: { $ref: 'UnexpectedError#' },
      },
    },
    handler: UserController.login,
  });

  fastify.route({
    method: 'POST',
    url: '/register',
    schema: {
      tags: ['Users'],
      body: { $ref: 'RegisterBody#' },
      response: {
        200: { $ref: 'RegisterResponse#' },
        400: { $ref: 'RegisterErrorResponse#' },
        500: { $ref: 'UnexpectedError#' },
      },
    },
    handler: UserController.register,
  });

  fastify.route({
    method: 'GET',
    url: '/me',
    schema: {
      tags: ['Users'],
      response: {
        200: { $ref: 'User#' },
        401: { $ref: 'UnauthorizedError#' },
        500: { $ref: 'UnexpectedError#' },
      },
      security: [{ token: [] }],
    },
    preHandler: isAuthenticated,
    handler: UserController.me,
  });

  fastify.route({
    method: 'POST',
    url: '/changePassword',
    schema: {
      tags: ['Users'],
      body: { $ref: 'ChangePasswordBody#' },
      response: {
        201: { $ref: 'ChangePasswordResponse#' },
        401: { $ref: 'UnauthorizedError#' },
        500: { $ref: 'UnexpectedError#' },
      },
      security: [{ token: [] }],
    },
    preHandler: isAuthenticated,
    handler: UserController.changePassword,
  });
}
