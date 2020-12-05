export default {
  $id: 'RegisterBody',
  title: 'RegisterBody',
  description: 'The register body to send',
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
}
