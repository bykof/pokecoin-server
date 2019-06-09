import User from './models/User'
import UserAlreadyExistsError from './errors/UserAlreadyExistsError';
import UserNotFoundError from './errors/UserNotFoundError';
import PasswordIncorrectError from './errors/PasswordIncorrectError';

export default class UserController {
  static async register(request, reply) {
    try {
      const user = await new User({
        username: request.body.username,
        password: User.hashPassword(request.body.password),
      }).save()
      return reply.send(user)
    } catch (error) {
      // Duplicate entry
      if (error.code === '11000') return reply.status(400).send(new UserAlreadyExistsError(request.body.username))
      return reply.status(500).send(error)
    }
  }

  static async login(request, reply) {
    console.log(request.headers)
    try {
      const user = await User.findOne({username: request.body.username})

      if (user) {
        if (user.password === User.hashPassword(request.body.password)) {
          return reply.send({token: user.generateJSONWebToken()})
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
}
