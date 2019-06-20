import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as fastifySwagger from 'fastify-swagger'
import * as mongoose from 'mongoose'
import authenticationRoutes from './users/routes'
import blockchainRoutes from './blockchain/routes'
import walletRoutes from './wallet/routes'
import swaggerConfig from './config/swaggerConfig'
import Blockchain from './blockchain/core/Blockchain'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})
const blockchain = Blockchain.getInstance();

async function startApplication() {
  process.on('SIGTERM', () => process.exit())
  await mongoose.connect('mongodb://localhost/pokecoin', { useNewUrlParser: true, useCreateIndex: true })
  await blockchain.setup();
  console.log(`Blockchain is setup with ${blockchain.chain.length} blocks`)
  server.register(fastifySwagger, swaggerConfig)
  server.register(authenticationRoutes, { prefix: '/auth' })
  server.register(blockchainRoutes, { prefix: '/blockchain' })
  server.register(walletRoutes, { prefix: '/wallet' })
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
      console.log('Server running:', address)

    }
  )
}

startApplication()
