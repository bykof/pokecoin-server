const swaggerConfig = {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Pokecoin',
      description: 'The Pokecoin documentation',
      version: '1.0.0'
    },
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

if (!process.env.PRODUCTION) {
  swaggerConfig.swagger['host'] = '0.0.0.0:3000'
}

export default swaggerConfig
