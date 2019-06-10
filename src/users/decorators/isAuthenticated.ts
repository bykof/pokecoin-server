import User from '../models/User'
import UnauthorizedError from '../errors/UnauthorizedError';

export default function isAuthenticated(request, reply, done) {
  const token = request.headers['token']
  if (!token || !User.verifyJSONWebToken(token)) {
    return reply.status(401).send(new UnauthorizedError())
  }
  done()
}
