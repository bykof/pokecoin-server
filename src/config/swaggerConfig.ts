import { SwaggerOptions } from "@fastify/swagger";
import * as packageJSON from "../../package.json";

const swaggerConfig = {
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
  refResolver: {
    buildLocalReference(json, baseUri, fragment, i) {
      return json.$id || `my-fragment-${i}`;
    },
  },
} as SwaggerOptions;

export default swaggerConfig;
