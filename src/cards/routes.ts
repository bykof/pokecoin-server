import fastify = require("fastify")
import { Server, IncomingMessage, ServerResponse } from "http"
import unexpectedErrorSchema from "../core/schemas/unexpectedErrorSchema"
import CardController from "./controller/CardController"
import pokemonCardSchema from "./schemas/pokemonCardSchema"
import { responseSuccessfulSchema as getResponseSuccessfulSchema } from "./schemas/getSchema"
import { responseSuccessfulSchema as listResponseSuccessfulSchema } from "./schemas/listSchema"
import notFoundSchema from "../core/schemas/notFoundSchema"
import pageParameterSchema from "../core/schemas/pageParameterSchema"


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
