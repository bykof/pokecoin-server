import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as oas from 'fastify-oas'
import * as mongoose from 'mongoose'
import * as pointOfView from 'point-of-view'
import * as ejs from 'ejs'
import authenticationRoutes from './users/routes'
import blockchainRoutes from './blockchain/routes'
import walletRoutes from './wallet/routes'
import cardRoutes from './cards/routes'
import viewRoutes from './views/routes'
import swaggerConfig from './config/swaggerConfig'
import Blockchain from './blockchain/core/Blockchain'
import CardsAggregate from './cards/core/CardsAggregate'
import CardPacksAggregate from './cards/core/CardPacksAggregate'
import * as BaseJSON from './json/pokemonCards/Base.json'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({logger: true})
const blockchain = Blockchain.getInstance();

const cardPacksAggregate = CardPacksAggregate.getInstance()
cardPacksAggregate.addCardPackFromJson('Base', BaseJSON)

const cardsAggregate = CardsAggregate.getInstance()
cardsAggregate.addCardsFromJson(BaseJSON)

// Env variables
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/pokecoin'
const PORT = parseInt(process.env.PORT) || 3000

async function startApplication() {
  process.on('SIGTERM', () => process.exit())

  await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true })
  await blockchain.setup();
  console.log(`Blockchain is setup with ${blockchain.chain.length} blocks`)

  server.register(
    pointOfView, {
      engine: {
        ejs: ejs
      },
      templates: './src/templates',
      includeViewExtension: true,
    }

  )
  server.register(oas, swaggerConfig)
  server.register(authenticationRoutes, { prefix: '/auth' })
  server.register(blockchainRoutes, { prefix: '/blockchain' })
  server.register(walletRoutes, { prefix: '/wallet' })
  server.register(cardRoutes, { prefix: '/cards' })
  server.register(viewRoutes, { prefix: '/views'})

  server.ready(async err => {
    if (err) throw err;
    await server.oas()
  })

  server.listen(
    PORT,
    '0.0.0.0',
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
