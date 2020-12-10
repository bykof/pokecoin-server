import { FastifyInstance } from "fastify";
import pokemonCardSchema from "./pokemonCardSchema";
import cardPackSchema from "./cardPackSchema";
import userCardSchema from "./userCardSchema";
import userCardsResponse from "./userCardsResponse";
import packagesResponse from "./packagesResponse";
import buyDefaultPackageSchemaResponse from "./buyDefaultPackageSchemaResponse";
import cardResponse from "./cardResponse";
import cardsResponse from "./cardsResponse";
import currentPackageCostResponse from "./currentPackageCostResponse";

export function init(fastify: FastifyInstance) {
  fastify.addSchema(pokemonCardSchema);
  fastify.addSchema(cardPackSchema);
  fastify.addSchema(userCardSchema);
  fastify.addSchema(buyDefaultPackageSchemaResponse);
  fastify.addSchema(packagesResponse);
  fastify.addSchema(userCardsResponse);
  fastify.addSchema(cardResponse);
  fastify.addSchema(cardsResponse);
  fastify.addSchema(currentPackageCostResponse);
}
