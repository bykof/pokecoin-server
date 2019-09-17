export default {
  $id: 'LoginBody',
  title: 'LoginBody',
  description: 'The body schema to login',
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
}
