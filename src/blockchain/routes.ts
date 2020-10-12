import isAuthenticated from '../users/decorators/isAuthenticated';
import BlockchainController from './controller/BlockchainController';

export default async function routes(fastify) {
  fastify.route({
    method: 'POST',
    url: '/blocks',
    schema: {
      tags: ['Blockchain'],
      body: { $ref: 'AddBlockBody#' },
      response: {
        200: { $ref: 'AddBlockResponse#' },
        400: { $ref: 'AddBlockErrorResponse#' },
        401: { $ref: 'UnauthorizedError#' },
        500: { $ref: 'UnexpectedError#' },
      },
      security: [{ token: [] }],
    },
    preHandler: isAuthenticated,
    handler: BlockchainController.addBlock,
  });

  fastify.route({
    method: 'GET',
    url: '/lastBlock',
    schema: {
      tags: ['Blockchain'],
      response: {
        200: { $ref: 'Block#' },
        401: { $ref: 'UnauthorizedError#' },
        500: { $ref: 'UnexpectedError#' },
      },
    },
    handler: BlockchainController.lastBlock,
  });

  fastify.route({
    method: 'GET',
    url: '/currentDifficulty',
    schema: {
      tags: ['Blockchain'],
      response: {
        200: { $ref: 'CurrentDifficultyResponse#' },
        500: { $ref: 'UnexpectedError#' },
      },
    },
    handler: BlockchainController.currentDifficulty,
  });
}
