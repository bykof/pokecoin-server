import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as oas from 'fastify-oas'
import * as mongoose from 'mongoose'
import * as pointOfView from 'point-of-view'
import * as ejs from 'ejs'
import { MONGODB_URL, PORT } from './env'
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
import UserSetup from './users/core/UserSetup';

import { init as userSchemasInit } from './users/schemas'
import { init as cardSchemasInit } from './cards/schemas'
import { init as blockSchemasInit } from './blockchain/schemas'
import { init as walletSchemasInit } from './wallet/schemas'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: true })
const blockchain = Blockchain.getInstance();

const cardPacksAggregate = CardPacksAggregate.getInstance()
cardPacksAggregate.addCardPackFromJson('Base', BaseJSON)

const cardsAggregate = CardsAggregate.getInstance()
cardsAggregate.addCardsFromJson(BaseJSON)

export async function setupDatabase() {
  await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

}

async function startApplication() {
  process.on('SIGTERM', () => process.exit())

  await setupDatabase()
  await UserSetup.setup()
  await blockchain.setup()
  console.log(`Blockchain is setup with ${blockchain.chain.length} blocks`)

  userSchemasInit(server)
  cardSchemasInit(server)
  walletSchemasInit(server)
  blockSchemasInit(server)

  server.register(
    pointOfView, {
    engine: {
      ejs: ejs
    },
    templates: './src/templates',
    includeViewExtension: true,
  }

  )
  server.register(
    oas,
    swaggerConfig,
  ).register(
    authenticationRoutes,
    { prefix: '/auth' },
  ).register(
    blockchainRoutes,
    { prefix: '/blockchain' },
  ).register(
    walletRoutes,
    { prefix: '/wallet' },
  ).register(
    cardRoutes,
    { prefix: '/cards' },
  ).register(
    viewRoutes,
    { prefix: '/views' },
  ).after(
    (error) => { if (error) { console.log(error) } }
  )

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
