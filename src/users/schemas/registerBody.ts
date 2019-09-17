export default {
  $id: 'RegisterBody',
  title: 'RegisterBody',
  decription: 'The body schema to register',
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
}
