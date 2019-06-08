import * as fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: true
})

server.get(
  '/',
  (request, reply) => {
    reply.send({'hello': 'world'})
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
