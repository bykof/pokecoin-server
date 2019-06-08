import User from './models/User'

export default class UserController {
  async register(request, reply) {
    try {
      const user = await new User({
        email: request.body.email,
        username: request.body.username,
        password: User.hashPassword(request.body.password),
      }).save()
      return reply.send({
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
      })
    } catch (error) {
      // Duplicate entry
      if (error.code === '11000') return reply.status(400).send(error)
      return reply.status(500).send(error)
    }
  }

  async login(request, reply) {

  }
}
