import User from './models/User'

export default class UserController {
  async register(request, reply) {
    try {
      const user = await new User({
        username: request.body.username,
        password: User.hashPassword(request.body.password),
      }).save()
      return reply.send(user)
    } catch (error) {
      // Duplicate entry
      if (error.code === '11000') return reply.status(400).send(error)
      return reply.status(500).send(error)
    }
  }

  async login(request, reply) {
    try {
      const user = await User.findOne({username: request.body.username, password: User.hashPassword(request.body.password)})

      if (user) {
        return reply.send({token: user.generateJSONWebToken()})
      } else {
        return reply.status(400).send({code: 'LOGIN_FAILED', message: 'User was not found or password incorrect'})
      }
    } catch (error) {
      return reply.status(500).send(error)
    }
  }
}
