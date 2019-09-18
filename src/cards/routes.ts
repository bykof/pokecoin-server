import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import unexpectedErrorSchema from "../core/schemas/unexpectedErrorSchema"
import CardController from "./controller/CardController"
import notFoundSchema from "../core/schemas/notFoundSchema"
import pageParameterSchema from "../core/schemas/pageParameterSchema"
import CardPackController from "./controller/CardPackController"
import isAuthenticated from "../users/decorators/isAuthenticated"
import UserCardController from "./controller/UserCardController"
import unauthorizedSchema from "../core/schemas/unauthorizedSchema"

export default async function routes(
  fastify: fastify.FastifyInstance,
  options: fastify.RegisterOptions<Server, IncomingMessage, ServerResponse>
) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Cards'],
      querystring: pageParameterSchema,
      response: {
        200: 'CardsResponse#',
        500: unexpectedErrorSchema,
      },
    },
    handler: CardController.list,
  })

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
            description: 'card id'
          }
        }
      },
      response: {
        200: 'CardResponse#',
        404: notFoundSchema,
        500: unexpectedErrorSchema,
      },
    },
    handler: CardController.get,
  })

  fastify.route({
    method: 'GET',
    url: '/usercards',
    schema: {
      tags: ['Cards'],
      response: {
        200: 'UserCardResponse#',
        401: unauthorizedSchema,
        500: unexpectedErrorSchema,
      },
      security: [{ 'token': [] }],
    },
    preHandler: isAuthenticated,
    handler: UserCardController.getCards,
  })

  fastify.route({
    method: 'GET',
    url: '/packages',
    schema: {
      tags: ['Cards'],
      response: {
        200: 'PackagesResponse#',
        500: unexpectedErrorSchema,
      },
    },
    handler: CardPackController.getCardPackages,
  })

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
            description: 'name of the cardpack'
          }
        }
      },
      response: {
        200: 'CardPack#',
        404: notFoundSchema,
        500: unexpectedErrorSchema,
      },
    },
    handler: CardPackController.getCardPack,
  })

  fastify.route({
    method: 'POST',
    url: '/packages/:cardPackName/buyDefaultPackage',
    schema: {
      tags: ['Cards'],
      params: {
        type: 'object',
        properties: {
          cardPackName: {
            type: 'string',
            description: 'name of the cardpack'
          }
        }
      },
      response: {
        200: 'BuyDefaultPackageSchemaResponse#',
        404: notFoundSchema,
        401: unauthorizedSchema,
        500: unexpectedErrorSchema,
      },
      security: [{ 'token': [] }],
    },
    preHandler: isAuthenticated,
    handler: CardPackController.buyDefaultPackage,
  })
}
