import User from '../models/User'
import UserAlreadyExistsError from '../errors/UserAlreadyExistsError'
import UserNotFoundError from '../errors/UserNotFoundError'
import PasswordIncorrectError from '../errors/PasswordIncorrectError'

export default class UserController {
  /**
   * Register a user by his username and password
   *
   * @param request
   * @param reply
   */
  static async register(request, reply) {
    try {
      const user = await new User({
        username: request.body.username,
        password: User.hashPassword(request.body.password),
      }).save()
      return reply.send(user)
    } catch (error) {
      // Duplicate entry
      if (error.code === 11000) return reply.status(400).send(new UserAlreadyExistsError(request.body.username))
      return reply.status(500).send(error)
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
      const user = await User.findOne({ username: request.body.username })

      if (user) {
        if (user.password === User.hashPassword(request.body.password)) {
          return reply.send({ token: user.generateJSONWebToken() })
        } else {
          return reply.status(400).send(new PasswordIncorrectError(request.body.username))
        }
      } else {
        return reply.status(400).send(new UserNotFoundError(request.body.username))
      }
    } catch (error) {
      return reply.status(500).send(error)
    }
  }

  /**
   * Get information of current user
   *
   * @param request
   * @param reply
   */
  static async me(request, reply) {

  }
}
