import { UserModel } from "../models/User";
import UserAlreadyExistsError from "../errors/UserAlreadyExistsError";
import UserNotFoundError from "../errors/UserNotFoundError";
import PasswordIncorrectError from "../errors/PasswordIncorrectError";

export default class UserController {
  /**
   * Register a user by his username and password
   *
   * @param request
   * @param reply
   */
  static async register(request, reply) {
    try {
      const user = await new UserModel({
        username: request.body.username,
        password: UserModel.hashPassword(request.body.password),
      }).save();
      return reply.send(user);
    } catch (error) {
      // Duplicate entry
      if (error.code === 11000) {
        return reply
          .code(400)
          .send(new UserAlreadyExistsError(request.body.username));
      }
      return reply.code(500).send(error);
    }
  }

  /**
   * Login a user by username and password in the request body
   *
   * @param request
   * @param reply
   */
  static async login(request, reply) {
    try {
      const user = await UserModel.findOne({ username: request.body.username });

      if (user) {
        if (user.password === UserModel.hashPassword(request.body.password)) {
          return reply.send({ token: user.generateJSONWebToken() });
        } else {
          return reply
            .code(400)
            .send(new PasswordIncorrectError(request.body.username));
        }
      } else {
        return reply
          .code(400)
          .send(new UserNotFoundError(request.body.username));
      }
    } catch (error) {
      return reply.code(500).send(error);
    }
  }

  /**
   * Get information of current user
   *
   * @param request
   * @param reply
   */
  static async me(request, reply) {
    return reply.send(request.user);
  }

  /**
   * Change password of user if the given password is the same as current
   *
   * @param request
   * @param reply
   */
  static async changePassword(request, reply) {
    const hashedPassword = UserModel.hashPassword(request.body.password);
    if (hashedPassword === request.user.password) {
      request.user.password = UserModel.hashPassword(request.body.newPassword);
      await request.user.save();
      return reply.code(201).send();
    }

    return reply
      .code(400)
      .send(new PasswordIncorrectError(request.user.username));
  }
}
