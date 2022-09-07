import { SwaggerOptions } from "@fastify/swagger";
import * as packageJSON from "../../package.json";

const swaggerConfig = {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Pokecoin",
      description: "The Pokecoin documentation",
      version: packageJSON.version,
    },
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      token: {
        type: "apiKey",
        name: "token",
        in: "header",
      },
    },
  },
} as SwaggerOptions;

export default swaggerConfig;
