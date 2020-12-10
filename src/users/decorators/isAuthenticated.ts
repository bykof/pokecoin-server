import { UserModel } from "../models/User";
import UnauthorizedError from "../../core/errors/UnauthorizedError";

export default async function isAuthenticated(request, reply) {
  const token = request.headers["token"];
  const user = await UserModel.getUserByJSONWebToken(token);
  if (!token || !user!) {
    return reply.status(401).send(new UnauthorizedError());
  } else {
    request.user = user;
    return;
  }
}
