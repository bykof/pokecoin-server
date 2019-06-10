export default {
  type: 'object',
  description: 'An unexpected error occured',
  properties: {
    code: { type: 'string', enum: ['UnexpectedError'] },
    message: { type: 'string' }
  }
}
