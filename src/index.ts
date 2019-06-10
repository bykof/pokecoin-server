import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as fastifySwagger from 'fastify-swagger'
import * as mongoose from 'mongoose'
import authenticationRoutes from './users/routes'
import swaggerConfig from './config/swaggerConfig';
import isAuthenticated from './users/decorators/isAuthenticated'

mongoose.connect('mongodb://localhost/pokecoin')

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})

server.register(fastifySwagger, swaggerConfig)

server.decorate('isAuthenticated', isAuthenticated)
server.register(authenticationRoutes, { prefix: '/auth' })

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
