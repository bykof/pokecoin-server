import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as fastifySwagger from 'fastify-swagger'
import * as mongoose from 'mongoose'
import authenticationRoutes from './authentication/routes'

mongoose.connect('mongodb://localhost/pokecoin')

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})

server.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Pokecoin',
      description: 'Pokecoin documentation',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header'
      }
    }
  }
})

server.register(
  authenticationRoutes,
  { prefix: '/auth' }
)

server.ready(
  (error) => {
    if (error) throw error
    server.swagger()
  }
)

server.listen(
  3000,
  (error, address) => {
    if (error) {
      server.log.error(error)
      process.exit(1)
    }
  }
)
