import UserClass from '../models/User'
import UnauthorizedError from '../errors/UnauthorizedError';

export default function isAuthenticated(request, reply, done) {
  const token = request.headers['token']
  if (!token || !UserClass.verifyJSONWebToken(token)) {
    return reply.status(401).send(new UnauthorizedError())
  }
  done()
}
