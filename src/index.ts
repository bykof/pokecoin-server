import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as fastifySwagger from 'fastify-swagger'
import * as mongoose from 'mongoose'
import authenticationRoutes from './users/routes'
import swaggerConfig from './config/swaggerConfig';
import isAuthenticated from './users/decorators/isAuthenticated'
import BlockChain from './blockchain/BlockChain';

mongoose.connect('mongodb://localhost/pokecoin')

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})
const blockChain: BlockChain = new BlockChain()

server.register(fastifySwagger, swaggerConfig)

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
