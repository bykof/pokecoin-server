import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import unexpectedErrorSchema from "../core/schemas/unexpectedErrorSchema"
import CardController from "./controller/CardController"
import { responseSuccessfulSchema as buyDefaultPackageResponseSuccessfulSchema } from "./schemas/buyDefaultPackageSchemas"
import { responseSuccessfulSchema as getResponseSuccessfulSchema } from "./schemas/getSchema"
import { responseSuccessfulSchema as listResponseSuccessfulSchema } from "./schemas/listSchema"
import { responseSuccessfulSchema as packagesResponseSuccessfulSchema } from "./schemas/packagesSchemas"
import { responseSuccessfulSchema as userCardResponseSuccessfulSchema } from "./schemas/userCardSchemas"
import notFoundSchema from "../core/schemas/notFoundSchema"
import pageParameterSchema from "../core/schemas/pageParameterSchema"
import CardPackController from "./controller/CardPackController"
import cardPackSchema from "./schemas/cardPackSchema"
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
      querystring: pageParameterSchema,
      response: {
        200: listResponseSuccessfulSchema,
        500: unexpectedErrorSchema,
      },
    },
    handler: CardController.list,
  })

  fastify.route({
    method: 'GET',
    url: '/usercards',
    schema: {
      response: {
        200: userCardResponseSuccessfulSchema,
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
      response: {
        200: packagesResponseSuccessfulSchema,
        500: unexpectedErrorSchema,
      },
    },
    handler: CardPackController.getCardPackages,
  })

  fastify.route({
    method: 'GET',
    url: '/packages/:cardPackName',
    schema: {
      response: {
        200: cardPackSchema,
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
      response: {
        200: buyDefaultPackageResponseSuccessfulSchema,
        404: notFoundSchema,
        401: unauthorizedSchema,
        500: unexpectedErrorSchema,
      },
      security: [{ 'token': [] }],
    },
    preHandler: isAuthenticated,
    handler: CardPackController.buyDefaultPackage,
  })

  fastify.route({
    method: 'GET',
    url: '/:cardId',
    schema: {
      response: {
        200: getResponseSuccessfulSchema,
        404: notFoundSchema,
        500: unexpectedErrorSchema,
      },
    },
    handler: CardController.get,
  })
}
