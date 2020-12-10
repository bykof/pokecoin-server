import isAuthenticated from "../users/decorators/isAuthenticated";
import WalletController from "./controllers/WalletController";

export default async function routes(fastify) {
  fastify.route({
    method: "GET",
    url: "/balance",
    schema: {
      tags: ["Wallet"],
      response: {
        200: { $ref: "BalanceResponse#" },
        401: { $ref: "UnauthorizedError#" },
        500: { $ref: "UnexpectedError#" },
      },
      security: [{ token: [] }],
    },
    preHandler: isAuthenticated,
    handler: WalletController.balance,
  });
}
