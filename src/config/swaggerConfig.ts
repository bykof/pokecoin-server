import { SwaggerOptions } from 'fastify-swagger';
import * as packageJSON from '../../package.json';

const swaggerConfig: SwaggerOptions = {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Pokecoin',
      description: 'The Pokecoin documentation',
      version: packageJSON.version,
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      token: {
        type: 'apiKey',
        name: 'token',
        in: 'header',
      },
    },
  },
};

if (!process.env.PRODUCTION) {
  swaggerConfig.swagger['host'] = '0.0.0.0:3000';
} else {
  swaggerConfig.swagger['schemes'] = ['https'];
  swaggerConfig.swagger['host'] = 'rocky-lowlands-35145.herokuapp.com';
}

export default swaggerConfig;
