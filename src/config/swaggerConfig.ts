export default {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Pokecoin',
      description: 'The Pokecoin documentation',
      version: '1.0.0'
    },
    host: '127.0.0.1:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      token: {
        type: 'apiKey',
        scheme: 'bearer',
        name: 'token',
        in: 'header',
      }
    }
  }
}
