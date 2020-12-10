import { FastifyInstance } from "fastify";
import userSchema from "./userSchema";
import changePasswordBody from "./changePasswordBody";
import changePasswordResponse from "./changePasswordResponse";
import loginBody from "./loginBody";
import loginErrorResponse from "./loginErrorResponse";
import loginResponse from "./loginResponse";
import registerBody from "./registerBody";
import registerResponse from "./registerResponse";
import registerErrorResponse from "./registerErrorResponse";

export function init(fastify: FastifyInstance) {
  fastify.addSchema(userSchema);

  fastify.addSchema(changePasswordBody);
  fastify.addSchema(changePasswordResponse);

  fastify.addSchema(loginBody);
  fastify.addSchema(loginResponse);
  fastify.addSchema(loginErrorResponse);

  fastify.addSchema(registerBody);
  fastify.addSchema(registerResponse);
  fastify.addSchema(registerErrorResponse);
}
