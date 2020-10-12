import CardController from './controller/CardController';
import CardPackController from './controller/CardPackController';
import isAuthenticated from '../users/decorators/isAuthenticated';
import UserCardController from './controller/UserCardController';

export default async function routes(fastify) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Cards'],
      querystring: { $ref: 'PageParameter#' },
      response: {
        200: { $ref: 'CardsResponse#' },
        500: { $ref: 'UnexpectedError#' },
      },
    },
    handler: CardController.list,
  });

  fastify.route({
    method: 'GET',
    url: '/:cardId',
    schema: {
      tags: ['Cards'],
      params: {
        type: 'object',
        properties: {
          cardId: {
            type: 'string',
            description: 'card id',
          },
        },
      },
      response: {
        200: { $ref: 'CardResponse#' },
        404: { $ref: 'NotFoundError#' },
        500: { $ref: 'UnexpectedError#' },
      },
    },
    handler: CardController.get,
  });

  fastify.route({
    method: 'GET',
    url: '/usercards',
    schema: {
      tags: ['Cards'],
      response: {
        200: { $ref: 'UserCardResponse#' },
        401: { $ref: 'UnauthorizedError#' },
        500: { $ref: 'UnexpectedError#' },
      },
      security: [{ token: [] }],
    },
    preHandler: isAuthenticated,
    handler: UserCardController.getCards,
  });

  fastify.route({
    method: 'GET',
    url: '/packages',
    schema: {
      tags: ['Cards'],
      response: {
        200: { $ref: 'PackagesResponse#' },
        500: { $ref: 'UnexpectedError#' },
      },
    },
    handler: CardPackController.getCardPackages,
  });

  fastify.route({
    method: 'GET',
    url: '/packages/:cardPackName',
    schema: {
      tags: ['Cards'],
      params: {
        type: 'object',
        properties: {
          cardPackName: {
            type: 'string',
            description: 'name of the cardpack',
          },
        },
      },
      response: {
        200: { $ref: 'CardPack#' },
        404: { $ref: 'NotFoundError#' },
        500: { $ref: 'UnexpectedError#' },
      },
    },
    handler: CardPackController.getCardPack,
  });

  fastify.route({
    method: 'GET',
    url: '/packages/:cardPackName/buyDefaultPackage',
    schema: {
      tags: ['Cards'],
      params: {
        type: 'object',
        properties: {
          cardPackName: {
            type: 'string',
            description: 'name of the cardpack',
          },
        },
      },
      response: {
        200: { $ref: 'BuyDefaultPackageSchemaResponse#' },
        404: { $ref: 'NotFoundError#' },
        401: { $ref: 'UnauthorizedError#' },
        500: { $ref: 'UnexpectedError#' },
      },
      security: [{ token: [] }],
    },
    preHandler: isAuthenticated,
    handler: CardPackController.buyDefaultPackage,
  });

  fastify.route({
    method: 'GET',
    url: '/packages/currentPackageCost',
    schema: {
      tags: ['Cards'],
      response: {
        200: { $ref: 'BuyDefaultPackageSchemaResponse#' },
      },
    },
    handler: CardPackController.currentPackageCost,
  });
}
